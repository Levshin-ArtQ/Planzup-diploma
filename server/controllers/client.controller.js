const db = require("../models");
const Client = db.client;
const Appointment = db.appointment;
const Notification = db.notification;
const Settings = db.settings;
const Schedule = db.schedule;
const Period = db.period;


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
        return res.status(404).json({
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

    if (!req.body || !req.body.clientId) {
        return res.status(400).json({
            message: 'Идентификатор клиента не предоставлен',
        });
    }

    Client.findOne({ where: { UID: req.body.clientId } })
        .then((client) => {

            if (!client) {
                return res.status(404).json({
                    message: 'Клиент не найден. Пожалуйста, попробуйте войти снова',
                });
            }

            return client.getSchedule()
                .then(schedule => {
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
            res.status(200).json({
                message: 'Записи успешно получены',
                data: appointments,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message || 'Произошла ошибка при получении записей клиента',
            });
        });

}


exports.getUpcomingAppointmentsCount = (req, res) => {

  if (!req.body || !req.body.clientId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  Client.findOne({ where: { UID: req.body.clientId } })
    .then((client) => {

      if (!client) {
        return res.status(404).json({
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
                {
                  status: {
                    [Op.in]: [
                      'pending',
                      'accepted'
                    ]
                  }
                }
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
          res.status(500).json({
            message:
              err.message || 'Произошла ошибка при получении количества записей клиента',
          });
        });

    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при получении данных клиента',
      });
    });

}






