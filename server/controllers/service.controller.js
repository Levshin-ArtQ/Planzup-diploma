const Service = require("../models").service;

exports.getServices = (req, res) => {
  Service.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Services.",
      });
    });
}

exports.getServiceById = (req, res) => {
  const serviceId = req.params.serviceId;
  Service.findByPk(serviceId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Service with id=" + serviceId,
      });
    });
}