const { where } = require("sequelize");
const db = require("../models");
const Settings = db.settings;

exports.getUserSettings = (req, res) => {
  Settings.findOne({
    include: {
      model: db.user,
      where: { UID: req.params.userId }
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Settings not found!"
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving settings."
      });
    });
};

exports.editSettins = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const settings = req.body.newSettings;
  Settings.update(settings, {
    where: { id: req.params.settingsId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Settings was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Settings with id=${req.params.settingsId}. Maybe Settings was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Settings with id=" + req.params.settingsId
      });
    });
}

exports.createSettings = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const settings = {
    name: req.body.username
      ? req.body.username
      : req.body.firstName
      ? req.body.firstName
      : null,
    password: req.body.password,
    usertype: type,
    push_token: req.body.push_token,
    prefers_telegram: req.body.prefers_telegram,
    prefers_email: req.body.prefers_email,
    prefers_push: req.body.prefers_push,
    prefers_: req.body.prefers_,
  };
  Settings.create(settings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Settings."
      });
    });

    next(req, res, data);
}

