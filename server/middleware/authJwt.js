const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
// const User = db.user;
const Admin = db.admin;
const Manager = db.manager;
const Master = db.master;
const Client = db.client;
const Settings = db.settings;

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("my headers:", req.headers);


  if (!token) {
    return res.status(403).send({
      message: "Токен авторизации не был предоставлен!"
    });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Пользователь не авторизован!",
                });
              }
              req.body.userId = decoded.UID;
              next();
            });
}

module.exports.verifyAdmin = (req, res, next) => {
  const settingsId = req.body.userId;
  Settings.findByPk(settingsId, { include: [Admin] }).then(settings => {
    if (!settings) {
      return res.status(404).send({
        message: "Настройки не были предоставлены"
      });
    }
    if (!settings.admin) {
      return res.status(404).send({
        message: "Администратор не был предоставлен"
      });
    }
    next();
  })
};
// TODO: Проверку на роль изменить на свои сущности
module.exports.verifyClient = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Токен авторизации не был предоставлен!"
    });
  }
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Пользователь не авторизован!",
                });
              }
              Client.findByPk(decoded.UID).then(user => {
                if (!user) {
                  return res.status(404).send({
                    message: "Пользователь не найден"
                  });
                }
                req.body.clientId = decoded.UID;
                next();
              });
            });
}
module.exports.isAdmin = (req, res, next) => {

  Admin.findByPk(req.userId).then(user => {
    console.log(user);
    if (!user) {
      
      return res.status(404).send({
        message: "Пользователь не найден"
      });
    }
    const token = req.headers["x-access-token"];
    console.log(req.headers);
    if (!token) {
      return res.status(403).send({
        message: "Токен авторизации не был предоставлен!"
      });
    }
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                if (user.UID !== decoded.UID) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                req.body.adminId = decoded.UID;
                next();
              });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

module.exports.isManager = (req, res, next) => {
  Manager.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден"
      });
    }
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Токен авторизации не был предоставлен!"
      });
    }
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                if (user.UID !== decoded.UID) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                req.body.managerId = decoded.UID;
                next();
              });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

module.exports.isMaster = (req, res, next) => {
  Master.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден"
      });
    }
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Токен авторизации не был предоставлен!"
      });
    }
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                if (user.UID !== decoded.UID) {
                  return res.status(401).send({
                    message: "Пользователь не авторизован!",
                  });
                }
                req.body.masterId = decoded.UID;
                next();
              });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

// module.exports.isClient = (req, res, next) => {
//   Client.findByPk(req.userId).then(user => {
//     if (!user) {
//       return res.status(404).send({
//         message: "Пользователь не найден"
//       });
//     }
//     const token = req.headers["x-access-token"];
//     if (!token) {
//       return res.status(403).send({
//         message: "Токен авторизации не был предоставлен!"
//       });
//     }
//     jwt.verify(token,
//               config.secret,
//               (err, decoded) => {
//                 if (err) {
//                   return res.status(401).send({
//                     message: "Пользователь не авторизован!",
//                   });
//                 }
//                 if (user.UID !== decoded.UID) {
//                   return res.status(401).send({
//                     message: "Пользователь не авторизован!",
//                   });
//                 }
//                 req.body.clientId = decoded.UID;
//                 next();
//               });
//   }).catch(err => {
//     res.status(500).send({ message: err.message });
//   });
// };


