const db = require("../models");
const Client = db.client;
const Master = db.master;
const Service = db.service;
const Manager = db.manager;
const Admin = db.admin;
const Salon = db.salon;
const Appointment = db.appointment;
const Notification = db.notification;
const Settings = db.settings;
const Schedule = db.schedule;
const Period = db.period;
const Clientcard = db.clientcard;
const Op = db.Sequelize.Op;

exports.getBySearch = (req, res, model) => {
  const search = req?.body?.search;

  if (!search) {
    return model.findAll();
  }
  const searchName = req.body?.searchName;
  const searchType = req.body?.searchType;
  const searchAddress = req.body?.searchAddress;

  return model.findAll({ where: { name: { [Op.like]: `%${search}%` } } });
};

exports.getSalon = (req, res) => {
  if (!req.params || !req.params.salonId) {
    return res.status(401).send({
      message: "Идентификатор салона не предотавлен",
    });
  }
  const id = req.params.salonId;
  Salon.findOne({
    where: { UID: id },
    include: { 
      model: Service,
      as: "services",
    },
    include: { 
      model: Master, as: "masters",
      include: { model: Service, as: "services" },
      include: { model: Schedule, as: "schedule",
        include: { model: Period, as: "periods" },
       },
    },
  }).then((data) => res.send(data)).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
exports.getSalons = (req, res) => {
  
  Salon.findAll({
    include: { 
      model: Service,
      as: "services",
    },
    include: { 
      model: Master, as: "masters",
      include: { model: Service, as: "services" },
      include: { model: Schedule, as: "schedule",
        include: { model: Period, as: "periods" },
       },
    },
  }).then((data) => res.status(200).send(data)).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.createAppointment = (req, res) => {
  if (!req.body || !req.body.userId) {
    return res.status(401).redirect("/login").send({
      message: "Идентификатор пользователя не предотавлен",
    });
  }

  // const userId = req.body.userId;
  // const clientId = req.body.clientId;
  // const masterId = req.body.masterId;
  // const date = req.body.date;
  // const time = req.body.time;
  // const type = req.body.type;
  // const comment = req.body.comment;
  // const address = req.body.address;
  // const name = req.body.name;
  // const phone = req.body.phone;
  // const masterName = req.body.masterName;
  // const masterPhone = req.body.masterPhone;
  // const masterEmail = req.body.masterEmail;
  // const masterPhoto = req.body.masterPhoto;
  // const service = req.body.service;
  // const servicePrice = req.body.servicePrice;
  // const serviceDuration = req.body.serviceDuration;
  // const serviceDescription = req.body.serviceDescription;
  // const servicePhoto = req.body.servicePhoto;
  // const serviceCategory = req.body.serviceCategory;
};

exports.getSchedule = (req, res) => {
  if (!req.body || !req.body.userId) {
    return res.status(401).redirect("/login").send({
      message: "Идентификатор пользователя не предотавлен",
    });
  }
  const isOldSchedule = req?.body?.old;
  const userType = req.params.userType;
  const dateOperator = Op.gte;
  if (isOldSchedule) {
    dateOperator = Op.lt;
  }
  if (!userType) {
    return res.status(400).send({
      message: "Тип пользователя не предоставлен",
    });
  }
  const model =
    userType === "client"
      ? Client
      : userType === "master"
      ? Master
      : userType === "manager"
      ? Manager
      : userType === "admin"
      ? Admin
      : null;

  if (!model) {
    return res.status(404).send({
      message: "Некорректный запрос к серверу",
    });
  }
  if (userType === "client" || userType === "master") {
    Settings.findOne({
      where: { UID: req.body.userId },
      include: {
        model: model,
        as: "user",
        include: {
          model: Schedule,
          as: "schedule",
          include: {
            model: Appointment,
            as: "appointments",
            include: {
              model: Service,
              as: "service",
            },
            where: {
              start: { [dateOperator]: new Date() },
            },
          },
          include: {
            model: Period,
            as: "periods",
            where: {
              start: { [dateOperator]: new Date() },
            },
          },
        },
      },
    })
      .then((settings) => {
        return res.status(200).send(settings.user);
      })
      .catch((err) => {
        console.log(
          "getAppointments - ошибка при получении записей ${userType}",
          err
        );
        return res.status(500).send({
          message: "При получении записей произошла ошибка, попробуйте позже",
        });
      });
  } else {
    Settings.findOne({
      where: { UID: req.body.userId },
      include: {
        model: model,
        as: "user",
        include: {
          model: Salon,
          as: "salon",
          include: {
            model: Master,
            as: "masters",
            include: {
              model: Schedule,
              as: "schedule",
              include: {
                model: Appointment,
                as: "appointments",
                where: {
                  start: { [dateOperator]: new Date() },
                },
                iclude: {
                  model: Client,
                  as: "client",
                  include: {
                    model: Clientcard,
                    as: "clientcard",
                  },
                },
              },

              include: {
                model: Period,
                as: "periods",
                where: {
                  start: { [dateOperator]: new Date() },
                },
              },
            },
          },
        },
      },
    })
      .then((settings) => {
        return res.status(200).send(settings.user);
      })
      .catch((err) => {
        console.log(
          "getAppointments - ошибка при получении записей ${userType}",
          err
        );
        return res.status(500).send({
          message: "При получении записей произошла ошибка, попробуйте позже",
        });
      });
  }
};

exports.getSettings = (req, res) => {
  if (!req.body || !req.body.userId) {
    return res.status(401).redirect("/login").send({
      message: "Идентификатор пользователя не предотавлен",
    });
  }

  Settings.findOne({ where: { UID: req.body.userId } })
    .then((settings) => {
      return res.status(200).send(settings);
    })
    .catch((err) => {
      console.log("getSettings - ошибка при получении настроек", err);
      return res
        .status(500)
        .send({ message: "При получении настроек произошла ошибка" });
    });
};

exports.updateSettings = (req, res) => {
  let changingPassword = false;
  if (!req.body || !req.body.userId) {
    return res.status(401).redirect("/login").send({
      message: "Нужно снова авторизоваться",
    });
  }
  if (!req.body.settings) {
    return res.status(400).send({
      message: "Настройки не предоставлены",
    });
  }
  if (
    (req.body.settings.password && !req.body.settings.newPassword) ||
    (!req.body.settings.password && req.body.settings.newPassword)
  ) {
    return res.status(400).send({
      message: "Новый или старый пароль не был предоставлен",
    });
  } else if (req.body.settings.password && req.body.settings.newPassword) {
    changingPassword = true;
  }
  if (changingPassword) {
    // get settings and change password
    Settings.findOne({ where: { UID: req.body.userId } }).then((settings) => {
      settings
        .validPassword(req.body.settings.password)
        .then((passwordIsValid) => {
          if (!passwordIsValid) {
            return res.status(400).send({
              message: "Неверный пароль!",
            });
          }
          settings.password = bcrypt.hashSync(
            req.body.settings.newPassword,
            10
          );
          settings
            .save()
            .then(() => {
              return res.status(200).send({ message: "Пароль обновлен" });
            })
            .catch((err) => {
              console.log("updateSettings - ошибка при обновлении пароля", err);
              return res
                .status(500)
                .send({ message: "При обновлении пароля произошла ошибка" });
            });
        });
    });
  }

  Settings.update(req.bod.settings, { where: { UID: req.body.userId } })
    .then(() => {
      return res.status(200).send({ message: "Настройки обновлены" });
    })
    .catch((err) => {
      console.log("updateSettings - ошибка при обновлении настроек", err);
      return res
        .status(500)
        .send({ message: "При обновлении настроек произошла ошибка" });
    });
};

exports.createSalon = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Данный запрос не может быть без данных о новом салоне",
    });
  }
  let salon = req.body;
  let masters = req.body.masters;
  console.log('schedule', masters.schedule);

  const newSalon = await Salon.create(salon, {
    include: [Service],
  });
  if (masters) {
    masters.forEach((master) => {
      const newSchedule = Schedule.create(
        {
          ...master.schedule,
        },
        {
          include: [Period],
        }
      );
      const newMaster = Master.create(
        {
          ...master,
          salonId: newSalon.id,
        },
        {
          include: [Settings],
        }
      );
      newMaster.then((mstr) => {
        newSalon.addMaster(mstr);
        newSchedule.then((schedule) => {
          mstr.setSchedule(schedule);
        });

        newSalon
          .getServices({
            where: {
              name: master.services,
            },
          })
          .then((services) => {
            mstr.setServices(services).then(() => {
              console.log("services set");
              
            });
          });
      });
    });
    res.status(200).send({ message: "Салон создан", data: newSalon.UID });
  }
};
