const Schedule = require("../models/schedule.model.js");
// TODO: edit requests
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const schedule = new Schedule({
    name: req.body.name,
    description: req.body.description
  });

  Schedule.create(schedule, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule."
      });
    else res.send(data);
  });
  
}