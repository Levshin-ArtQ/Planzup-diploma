const { where } = require("sequelize");
const db = require("../models");
const Appointment = db.appointment;
const Client = db.client;
const Settings = db.settings;
const Schedule = db.schedule;
const Period = db.period;
const Notification = db.notification;
const ClientCard = db.clientCard;

const Op = db.Sequelize.Op;

exports.onNewClient = (newClient) => {
  return;
};

const createNotifications = (
  transaction,
  newAppointment,
  client,
  clientSettings,
  master,
  masterSettings,
  service
) => {
  return new Promise((resolve, reject) => {
    let description = `Запись на ${newAppointment.service} от ${newAppointment.client}`;
    Notification.create({}, { transaction: transaction, include: [] })
      .then((notification) => {
        resolve(notification);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.onAddPeriodToSchedule = async (period, scheduleId) => {
  // to DeletePeriods and toDeclineAppointments are arrays of UIDs create sequelize trnasaction that will delete toDeletePeriods call function to decline toDeclineAppointments that are associated with this schedule checking them to be after now. than enshures that schedules doesn't have periods that are conflicting with passed periods starts and ends and only than stores periods objects into sequlize via bulkCreate and sets them to schedule
  // check periods for necessary fields
  // check period.start and period.end
  // 
  
  // split periods for those that are before now and those that are after now
  const workingSchedule = await Schedule.findOne({
    where: {
      UID: scheduleId,
    },
    include: [
      {
        model: Period,
        as: "periods",
        attributes: ["UID", "start", "end"],
        where: {
          where: {
            [Op.or]: [
              {
                start: {
                  [Op.between]: [period.start, period.end],
                },
              },
              {
                end: {
                  [Op.between]: [period.start, period.end],
                },
              },
            ],
          },
        }
      },
      {
        model: Appointment,
        as: "appointments",
        where: {
          start: {
            [Op.gt]: Date.now(),
          },
          end: {
            [Op.gt]: Date.now(),
          },
        },
      },
    ],
  });
  


};



exports.onNewAppointment = async (
  newAppointment,
  client,
  master,
  service,
  serviceId,
  clientSettingsId,
  masterSettingsId,
  clientScheduleId,
  masterScheduleId
) => {
  // TODO: permission for client's schedule overlap should be asked on the client side

  const result = await db.sequelize.transaction(async (t) => {
    // check if appointment time is available on master's schedule by period
    let appointmentService;
    if (!service && serviceId) {
      appointmentService = await Service.findOne({
        where: { UID: serviceId },
        transaction: t,
      });
    }
    let clientSchedule, masterSchedule, masterSettings, clientSettings;
    if (client && master) {
      clientSchedule = await client.getSchedule({ transaction: t });
      masterSchedule = await master.getSchedule({ transaction: t });
      masterSettings = await master.getSetting({ transaction: t });
      clientSettings = await client.getSetting({ transaction: t });
    } else if (clientSettingsId && masterSettingsId) {
      clientSettings = await Settings.findOne({
        where: { UID: clientSettingsId },
        transaction: t,
      });
      masterSettings = await Settings.findOne({
        where: { UID: masterSettingsId },
        transaction: t,
      });
    } else {
      clientSchedule = await Schedule.findOne({
        where: { UID: clientScheduleId },
        transaction: t,
      });
      masterSchedule = await Schedule.findOne({
        where: { UID: masterScheduleId },
        transaction: t,
      });
    }

    if (!clientSchedule || !masterSchedule) {
      throw new Error("Не удалось получить расписание");
    }

    if (!clientSettings || !masterSettings) {
      throw new Error("Не удалось получить настройки"); // TODO: не обязательно выкидывать, использовать дефолтные
    }

    if (!service) {
      throw new Error("Не удалось получить данные о услуге");
    }

    // check if time is available
    // if not, throw error

    masterSchedule
      .getPeriods({
        where: {
          [Op.or]: [
            {
              start: {
                [Op.between]: [newAppointment.start, newAppointment.end],
              },
            },
            {
              end: {
                [Op.between]: [newAppointment.start, newAppointment.end],
              },
            },
          ],
        },
      })
      .then(async (periods) => {
        if (periods.length === 0) {
          throw new Error("Выбранное время уже недоступно, запись не создана");
        }
        const isVIP = client ? client.isVIP : false;
        // if one of the periods is not available, throw error
        for (let i = 0; i < periods.length; i++) {
          if (
            !periods[i].available &&
            !(isVIP && periods[i].type === "forVIP")
          ) {
            throw new Error("Время недоступно, запись не создана", {
              conflictingPeriod: periods[i],
              appointment: newAppointment,
            });
          }
        }
        // create new appointment add it to master's and client's schedules
        const newApp = await Appointment.create(newAppointment, {
          transaction: t,
        });
        masterSchedule.addAppointment(newApp, { transaction: t });
        clientSchedule.addAppointment(newApp, { transaction: t });
        //update periods to not available or cut their end or start time
        for (let i = 0; i < periods.length; i++) {
          // if master schedule allows sharding, then modify period end and start time
          if (masterSettings.shardingSchedule) {
            // if period end and start is between new appointment start and end time then make unavailable
            if (
              periods[i].start < newAppointment.start &&
              periods[i].end > newAppointment.end
            ) {
              periods[i].update({ available: false }, { transaction: t });
              continue;
            }
            if (periods[i].start < newAppointment.start) {
              periods[i].start = newAppointment.start;
            }
            if (periods[i].end > newAppointment.end) {
              periods[i].end = newAppointment.end;
            }
          } else {
            periods[i].update({ available: false }, { transaction: t });
          }
        }
        // TODO: update client balance
        // TODO: send notification to master
        // TODO: send notification to client
        return newApp;
      });
  });
};

exports.testSchedule = async () => {
  // create two schedules
  const schedule1 = await db.schedule.create({
    userId: "testClient1",
    name: "testSchedule1",
  });
  const schedule2 = await db.schedule.create({
    userId: "testMaster1",
    name: "testSchedule2",
  });

  // create periods for the schedules
  const periods = await Period.bulkCreate([
    {
      start: new Date("2023-09-19T08:00:00.000Z"),
      end: new Date("2023-09-19T10:00:00.000Z"),
      available: false,
    },
    {
      start: new Date("2023-09-19T10:00:00.000Z"),
      end: new Date("2023-09-19T12:00:00.000Z"),
      available: true,
    },
    {
      start: new Date("2023-09-19T14:00:00.000Z"),
      end: new Date("2023-09-19T16:00:00.000Z"),
      available: true,
    },
    {
      start: new Date("2023-09-19T18:00:00.000Z"),
      end: new Date("2023-09-19T20:00:00.000Z"),
      available: true,
    },
    {
      start: new Date("2023-09-19T22:00:00.000Z"),
      end: new Date("2023-09-20T00:00:00.000Z"),
      available: false,
    },
  ]);

  const schedule1Created = await schedule1.addPeriods(periods);

  // await schedule2.createPeriods([
  //     {
  //         start: new Date('2023-09-20T08:00:00.000Z'),
  //         end: new Date('2023-09-20T10:00:00.000Z'),
  //         available: true,
  //     },
  //     {
  //         start: new Date('2023-09-20T12:00:00.000Z'),
  //         end: new Date('2023-09-20T14:00:00.000Z'),
  //         available: true,
  //     },
  // ]);

  // create an appointment
  const appointment = await db.appointment.create({
    name: "test appointment",
    clientId: "testClient1",
    masterId: "testMaster1",
    start: new Date("2023-09-19T11:00:00.000Z"),
    endTime: new Date("2023-09-19T13:00:00.000Z"),
  });

  // add the appointment to the schedules
  schedule1.addAppointments(appointment);
  schedule2.addAppointments(appointment);

  return { schedule1, schedule2, appointment };
};
