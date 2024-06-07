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

  if (!req.body || !req.body.clientId) {
    return res.status(400).json({
      message: 'Идентификатор клиента не предоставлен',
    });
  }

  Client.findOne({ where: { UID: req.body.clientId } })
    .then((data) => {

      if (!data) {
        return res.status(404).json({
          message: 'Настройки не найдены. Пожалуйста, попробуйте войти снова',
        });
      }

      data.getSetting()
        .then((settings) => {
          res.status(200).json({
            message: 'Настройки успешно получены',
            data: settings,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:
              err.message || 'Произошла ошибка при получении настроек клиента',
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




