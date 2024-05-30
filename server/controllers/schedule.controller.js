const Schedule = require("../models/schedule.model.js");
// TODO: edit requests
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
}