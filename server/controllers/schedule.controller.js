const db = require("../models");
const Schedule = db.schedule;
const Period = db.period;
const Appointment = db.appointment;

// TODO: edit requests

exports.getScheduleById = (req, res) => {
  if (!req.body || !req.body.scheduleId) {
    return res.status(400).json({
      message: 'Идентификатор расписания не предоставлен',
    });
  }
  Schedule.findOne({ where: { UID: req.body.scheduleId } })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: 'Расписание не найдено. Пожалуйста, попробуйте войти снова',
        });
      }
      res.status(200).json({
        message: 'Расписание успешно получено',
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при получении расписания',
      });
    });
}

exports.getSchedulseWithNext = (req, res, next) => {
  if (!req.body || !req.body.scheduleId) {
    return res.status(400).json({
      message: 'Идентификатор расписания не предоставлен',
    });
  }
  Schedule.findOne({ where: { UID: req.body.scheduleId } })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: 'Расписание не найдено. Пожалуйста, попробуйте войти снова',
        });
      }
      next(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Произошла ошибка при получении расписания',
      });
    });
}

exports.addPeriod = (req, res, next) => {
  if (!req.body || !req.body.period) {
    return res.status(400).json({
      message: 'Период не предоставлен',
    });
  }
  this.getSchedulseWithNext(req, res, (data) => {
    data.addPeriod(req.body.period)
      .then((data) => {
        res.status(200).json({
          message: 'Период успешно добавлен',
          data: data,
        });
        if (next) next(data);
      })
      .catch((err) => {
        res.status(500).json({
          message:
            err.message || 'Произошла ошибка при добавлении периода',
        });
      });
  });

}

exports.addAppointment = (req, res, next) => {
  if (!req.body || !req.body.appointment) {
    return res.status(400).json({
      message: 'Запись не предоставлена',
    });
  }

  this.getSchedulseWithNext(req, res, (data) => {
    data.addAppointment(req.body.appointment)
      .then((data) => {
        res.status(200).json({
          message: 'Запись успешно добавлена',
          data: data,
        });
        if (next) next(data);
      })
      .catch((err) => {
        res.status(500).json({
          message:
            err.message || 'Произошла ошибка при добавлении записи',
        });
      });

  });

}
