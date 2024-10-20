const db = require("../models");
const Settings = db.settings;
const Manager = db.manager;
const Master = db.master;
const Client = db.client;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log(req.body);
  // Username
  Settings.findOne({
    where: {
      username: req.body?.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message:
          "Пользователь с именем " + req.body.username + " уже существует!",
      });
      return;
    }

    // Email
    Settings.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message:
            "Этот email уже используется! Попробуйте войти под ним или зарегистрируйтесь под другой почтой",
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
