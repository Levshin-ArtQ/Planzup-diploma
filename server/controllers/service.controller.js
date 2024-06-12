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

exports.updateService = (req, res) => {
  // check if req.body has field userId
  if (!req.body || !req.body.userId) {
    return res.status(400).json({
      message: 'Идентификатор пользователя не предоставлен',
    });
  }
  
  const serviceId = req.params.serviceId;
  // 

  Service.update(req.body, {
    where: { UID: serviceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Service was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Service with id=${serviceId}. Maybe Service was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Service with id=" + serviceId,
      });
    });
}

exports.createService = (req, res) => {
  const service = req.body;
  Service.create(service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service.",
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