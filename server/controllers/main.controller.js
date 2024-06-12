const db = require("../models");
const Client = db.client;
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

exports.createAppointment = (req, res) => {
  if (!req.body || !req.body.userId) {
    return res.status(401).redirect("/login").send({
      message: "Идентификатор пользователя не предотавлен",
    });
  }

  const userId = req.body.userId;
  const clientId = req.body.clientId;
  const masterId = req.body.masterId;
  const date = req.body.date;
  const time = req.body.time;
  const type = req.body.type;
  const comment = req.body.comment;
  const address = req.body.address;
  const name = req.body.name;
  const phone = req.body.phone;
  const masterName = req.body.masterName;
  const masterPhone = req.body.masterPhone;
  const masterEmail = req.body.masterEmail;
  const masterPhoto = req.body.masterPhoto;
  const service = req.body.service;
  const servicePrice = req.body.servicePrice;
  const serviceDuration = req.body.serviceDuration;
  const serviceDescription = req.body.serviceDescription;
  const servicePhoto = req.body.servicePhoto;
  const serviceCategory = req.body.serviceCategory;
}

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
        return res
          .status(500)
          .send({
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
        return res
          .status(500)
          .send({
            message: "При получении записей произошла ошибка, попробуйте позже",
          });
      });
  }
};
