const db = require("../models");
const Client = db.client;
const Appointment = db.appointment;
const Notification = db.notification;
const Settings = db.settings;
const Schedule = db.schedule;
const Period = db.period;
const Op = db.Sequelize.Op;


exports.getClient = (req, res) => {

  if (!req.body || !req.body.clientId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  Client.findOne({ where: { UID: req.body.clientId } })
    .then((data) => {

      if (!data) {
        return res.status(404).json({
          message: 'Данные клиента не найдены. Пожалуйста, попробуйте войти снова',
        });
      }

      res.status(200).json(data);

    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при попытке получить данные клиента',
      });
    });
};

exports.updateClient = (req, res) => {

  if (!req.body || !req.body.clientId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  const clientId = req.body.clientId || req.params.clientId;

  Client.update(req.body.updatedClient, {
    where: { UID: clientId },
  })
    .then((num) => {

      if (num == 1) {
        res.json({
          message: 'Данные клиента успешно обновлены',
        });
      } else {
        res.json({
          message: `Не удалось обновить данные клиента с идентификатором ${clientId}. Возможно, данные клиента не найдены или запрос не содержит данных`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при обновлении данных клиента',
      });
    });
};

exports.getClientSettings = (req, res) => {
  console.log('getClientSettings request:', req.body);

  if (!req.body || !req.body.clientId) {
    console.log('Error: clientId not provided');
    return res.status(408).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  console.log('Start finding client');
  Client.findOne({ where: { UID: req.body.clientId } })
    .then((data) => {
      console.log('client found:', data);

      if (!data) {
        console.log('Error: client not found');
        return res.status(401).json({
          message: 'Настройки не найдены. Пожалуйста, попробуйте войти снова',
        });
      }

      console.log('Start getting settings');
      data.getSetting()
        .then((settings) => {
          console.log('settings received:', settings);
          res.status(200).json({
            message: 'Настройки успешно получены',
            data: settings,
          });
        })
        .catch((err) => {
          console.log('Error:', err);
          res.status(500).json({
            message:
              err.message || 'Произошла ошибка при получении настроек клиента',
          });
        });

    })
    .catch((err) => {
      console.log('Error:', err);
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при получении данных клиента',
      });
    });
};

exports.getClientSchedule = (req, res) => {

  if (!req.body || !req.body.clientId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  Client.findOne({ where: { UID: req.body.clientId } })
    .then((data) => {

      if (!data) {
        return res.status(404).json({
          message: 'Расписание не найдено. Пожалуйста, попробуйте войти снова',
        });
      }

      data.getSchedule()
        .then((schedule) => {
          res.status(200).json({
            message: 'Расписание успешно получено',
            data: schedule,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:
              err.message || 'Произошла ошибка при получении расписания клиента',
          });
        });

    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при получении данных клиента',
      });
    });
};


exports.getUpcomingAppointments = (req, res) => {

    console.log('getUpcomingAppointments - start');
    console.log('getUpcomingAppointments - req.body', req.body);

    if (!req.body || !req.body.userId) {
        console.log('getUpcomingAppointments - не предоставлен идентификатор клиента');
        return res.status(401).json({
            message: 'Идентификатор клиента не предоставлен',
        });
    }

    Settings.findOne({ where: { UID: req.body.userId } })
        .then((client) => {

            if (!client) {
                console.log('getUpcomingAppointments - клиент не найден');
                return res.status(401).json({
                    message: 'Клиент не найден. Пожалуйста, попробуйте войти снова',
                });
            }

            console.log('getUpcomingAppointments - клиент найден');

            client.getClient().getSchedule()
                .then(schedule => {
                    console.log('getUpcomingAppointments - расписание клиента получено');
                    return schedule.getAppointments({
                        where: {
                            start: { [Op.gte]: new Date() },
                            // [Op.and]: [
                            //     { start: { [Op.gte]: new Date() } },
                            //     {
                            //         status: {
                            //             [Op.in]: [
                            //                 'pending',
                            //                 'accepted'
                            //             ]
                            //         }
                            //     }
                            // ]
                        }
                    });
                })

        })
        .then((appointments) => {
            console.log('getUpcomingAppointments - записи клиента получены');
            res.status(200).send(appointments);
        })
        .catch((err) => {
            console.log('getUpcomingAppointments - ошибка при получении записей клиента', err);
            res.status(500).send({
                message:
                    err.message || 'Произошла ошибка при получении записей клиента',
            });
        });

}


exports.getUpcomingAppointmentsCount = (req, res) => {
  console.log('getUpcomingAppointmentsCount');

  if (!req.body || !req.body.userId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }
  console.log("req?.body?.userId", req?.body?.userId)
  Settings.findOne({ where: { UID: req.body.userId } })

    .then((client) => {

      if (!client) {
        console.log('client not found');
        return res.status(401).send({
          message: 'Клиент не найден. Пожалуйста, попробуйте войти снова',
        });
      }

      return client.getSchedule()
        .then((schedule) => {
          if (!schedule) {
            return res.status(404).json({
              message: 'Расписание не найдено. Пожалуйста, попробуйте войти снова',
            });
          }

          return schedule.countAppointments({
            where: {
              [Op.and]: [
                { start: { [Op.gte]: new Date() } },
                // {
                //   status: {
                //     [Op.in]: [
                //       'pending',
                //       'accepted'
                //     ]
                //   }
                // }
              ]
            }
          });
        })
        .then((count) => {
          res.status(200).json({
            message: 'Количество записей успешно получены',
            data: count,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message:
              err.message || 'Произошла ошибка при получении количества записей клиента',
          });
        });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Произошла ошибка при получении данных клиента');
    });

}

module.exports.deleteAppointment = (req, res) => {
  console.log('deleteAppointment');

  if (!req.body || !req.body.userId || !req.params.appointmentId) {
    return res.status(400).json({
      message: 'Идентификатор клиента или записи не предоставлен',
    });
  }

  Client.findOne({ where: { UID: req.body.userId } })
    .then((client) => {

      if (!client) {
        console.log('client not found');
        return res.status(401).send({
          message: 'Клиент не найден. Пожалуйста, попробуйте войти снова',
        });

      }
      Appointment.findByPk(req.params.appointmentId, { include: [Schedule] })
        .then((appointment) => {
          if (!appointment) {
            console.log('appointment not found');
            return res.status(404).send({
              message: 'Запись не найдена. Пожалуйста, попробуйте войти снова',
            });
          }
          appointment.update({ status: 'canceled' })
            .then(() => {
              appointment.save().then(() => {
                res.status(200).json({
                  message: 'Запись успешно отменена',
                });
              });
              res.status(200).json({
                message: 'Запись успешно отменена',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message:
                  err.message || 'Произошла ошибка при отмене записи',
              });
            });
        })
      

    })
}

module.exports.CancelAppointment = (req, res) => {
  console.log('CancelAppointment');
  let foundClient;
  let foundAppointment;

  if (!req.body || !req.body.userId || !req.params.appointmentId) {
    return res.status(400).json({
      message: 'Идентификатор клиента или записи не предоставлен',
    });
  }

  Settings.findOne({ where: { UID: req.body.userId } })
    .then((client) => {

      if (!client) {
        console.log('client not found');
        return res.status(401).send({
          message: 'Клиент не найден. Пожалуйста, попробуйте войти снова',
        });
      }

      foundClient = client;

      return Appointment.findByPk(req.params.appointmentId, { include: [Schedule] })
    })

    .then((appointment) => {
      if (!appointment) {
        console.log('appointment not found');
        return res.status(404).send({
          message: 'Запись не найдена. Пожалуйста, попробуйте войти снова',
        });
      }
      foundAppointment = appointment;
      return appointment.update({ status: 'canceled' })
    })

}








