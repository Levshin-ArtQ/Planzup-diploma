const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Settings = db.settings;
const Manager = db.manager;
const Master = db.master;
const Client = db.client;
const Schedule = db.schedule;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log(req.body);
  const userType = req.body.userType;
  const userModel = userType === "master" ? Master : userType === "manager" ? Manager : Client;
  // Save User to Database
  Settings.create({
    name: req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(settings => {
      userModel.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
      }).then(user => {
        user.setSettings(settings);
        if (userType === "manager") {
          res.send({ message: "Поздравляем, " + req.body.username + " вы успешно зарегистрировались как " + userType + "!" });
          console.log(userType + " " + req.body.username + " created");
        }
        Schedule.create({
          name: req.body.username,
          type: userType,
          description: "рассписание " + req.body.username
        }).then(schedule => {
          user.setSchedule(schedule);
          res.send({ message: "Поздравляем, " + req.body.username + " вы успешно зарегистрировались как " + userType + "!" });
          console.log(userType + " " + req.body.username + " created");
        })
        
      }).catch(err => {
        res.status(500).send({ 'Ошибка при установке настоек': err.message });
      });


    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};