const db = require("../models");
const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;
const Settings = db.settings;
const Manager = db.manager;
const Master = db.master;
const Client = db.client;
const Schedule = db.schedule;
const Admin = db.admin;
const Notification = db.notification;
const Appointment = db.appointment;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const userType = req.body.userType;
  // определяю тип пользователя который регитрируется
  const userModel =
    userType === "master" ? Master : userType === "manager" ? Manager : Client;
  // Save User to Database
  Settings.create({
    name: req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((settings) => {
      userModel
        .create({
          name: req.body.name,
          username: req.body.username,
          firstName: req.body.username,
          lastName: req.body.username,
          email: req.body.email,
        })
        .then((user) => {
          user.setSetting(settings);
          if (userType === "manager") {
            res.send({
              message:
                "Поздравляем, " +
                req.body.username +
                " вы успешно зарегистрировались как " +
                userType +
                "!",
            });
            console.log(userType + " " + req.body.username + " created");
          }
          Schedule.create({
            name: req.body.username,
            type: userType,
            description: "рассписание " + req.body.username,
            appointments: [
              {
                start: new Date(),
                end: new Date(),
                status: "pending",
              },
              {
                start: new Date(),
                end: new Date(),
                status: "pending",
              },
            ],
          }).then((schedule) => {
            user.setSchedule(schedule);
            res.send({
              message:
                "Поздравляем, " +
                req.body.username +
                " вы успешно зарегистрировались как " +
                userType +
                "!",
            });
            console.log(userType + " " + req.body.username + " created");
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ "Ошибка при установке настоек": err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  console.log('signin in');
  if (!req?.body?.username || !req?.body?.password) {
    return res
      .status(404)
      .send({ message: "Пользователь или пароль не были предоставлены" });
  }
  console.log('has required fields');
  Settings.scope("withPassword")
    .findOne({
      where: {
        username: req.body.username,
      },
      include: [
        {
          model: Client,
          as: "client",
        },
        {
          model: Master,
          as: "master",
        },
        {
          model: Manager,
          as: "manager",
        },
        {
          model: Admin,
          as: "admin",
        },
      ],
    })
    .then((settings) => {
      if (!settings) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      console.log("req.body.password", req.body.password);
      var passwordIsValid = settings
        .validPassword(req.body.password)
        .then((passwordIsValid) => {
          console.log("passwordIsValid", passwordIsValid);
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Неверный пароль!",
            });
          } else {
            

            let user = {};

            if (settings.client) {
              user = settings.client;
            }
            if (settings.master) {
              user = settings.master;
            }
            if (settings.manager) {
              user = settings.manager;
            }

            if (user) {
              const token = jwt.sign({ UID: settings.UID }, config.secret, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours 
              });
              res.status(200).send({
                UID: user.UID,
                username: user.firstName,
                status: user.status,
                accessToken: token,
              });
            } else {
              return res
                .status(403)
                .send({ message: "Пользователь не найден" });
            }
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.verifyToken = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(404).redirect("/login").send({ message: "Войдите в свой аккаунт" });
  }
  Settings.findOne({ where: { UID: req.body.userId } }).then ((settings) => {
    if (!settings) {
      return res.status(404).redirect("/login").send({ message: "Войдите в свой аккаунт" });
    }

  })
  res.status(200).send({ message: "Токен валиден, вы" + req.body.userType });
}

// user	{"UID":"7652f3e5-52c4-49e1-8e69-723de4560e35","username":"loginClient3","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiI0OWU4ZTgwNi05NjQwLTQyMjktYmZmMC1mYjBmM2U3NGYzYzkiLCJpYXQiOjE3MTg2ODMyNDcsImV4cCI6MTcxODc2OTY0N30.CSVGg53byWRBekskIRljcVK38_vHT_IxvPg8rt43gjY"}