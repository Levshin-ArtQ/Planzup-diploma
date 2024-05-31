const db = require("../models");
const Admin = db.admin;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const newadmin = {
    firstName: req.body.firstName ? req.body.firstName : null,
    firstName: req.body.lastName ? req.body.lastName : null,
    phone: req.body.phone ? req.body.phone : null,
    email: req.body.email ? req.body.email : null,
    password: req.body.password ? req.body.password : null, 
    telegram: req.body.telegram ? req.body.telegram : null,

  };
  Admin.create(newadmin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    });
}