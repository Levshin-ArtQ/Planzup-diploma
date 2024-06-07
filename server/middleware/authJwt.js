const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
// const User = db.user;
const Admin = db.admin;
const Manager = db.manager;
const Master = db.master;
const Client = db.client;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

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
};
// TODO: Проверку на роль изменить на свои сущности
const isAdmin = (req, res, next) => {
  Admin.findByPk(req.userId).then(user => {
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
                req.body.adminId = decoded.UID;
                next();
              });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const isManager = (req, res, next) => {
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

const isMaster = (req, res, next) => {
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

const isClient = (req, res, next) => {
  Client.findByPk(req.userId).then(user => {
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
                req.body.clientId = decoded.UID;
                next();
              });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isMaster: isMaster,
  isManager: isManager,
  isClient: isClient
};
module.exports = authJwt;