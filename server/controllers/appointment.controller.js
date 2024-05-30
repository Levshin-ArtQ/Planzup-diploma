const { service } = require("../models");
const db = require("../models");
const Appointment = db.appointment;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const newappointment ={
    date: req.body.date ? req.body.date : null,
    time: req.body.time ? req.body.time : null,
    service: req.body.service ? req.body.service : null,
    master: req.body.master ? req.body.master : null,
    client: req.body.client ? req.body.client : null,
  };

  Appointment.create(newappointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment.",
      });
    });
};

exports.getAppointmentByClient = (req, res) => {
  console.log('client',req.params.clientId);
  Appointment.findOne({
    where: {client: req.params.clientId}
  }).then(appoint => {
    if (!appoint) {
      res.status(408).send({message: "Запись не найдена"});
    } else {
      res.status(200).send({data: appoint, message: "Запись получена"});
    }
  }).catch(err => res.status(500).send({message: err.message}))
}

exports.getAppointments = (req, res) => {
  Appointment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointments.",
      });
    });
};

exports.getAppointmentById = (req, res) => {
  const appointmentId = req.params.reservationId;
  console.log('appointmentId', appointmentId);
  Appointment.findByPk(appointmentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointment not found with id ${appointmentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Appointment with id " + appointmentId,
        });
      }
    } else res.status(200).send({data: data, message: "Запись получена"});
  });
}

// exports.checkAppointmentClients = (req, res) => {
//   const appointmentId = req.params.appointmentId;
//   console.log('appointmentId', appointmentId); 
//   Appointment.findByPk(appointmentId)
//     .then(data => {
//       if (!data) {
//         res.status(408).send({message: "Запись не найдена"});
//       }
//       const result = data.hasUsers()
//         .then(data => {
//           res.status(200).send({data: data, message: "Запись получена"});
//         })
//         .catch(err => res.status(500).send({message: 'Ошибка при просмотре клиента записи'}));

      
//     }).catch(err => { 
//       console.error(err)
//       res.status(500).send({message: err})
//     });
// }
exports.checkAppointmentClients = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  console.log('appointmentId', appointmentId); 
  let foundAppointment = '';

  if (!appointmentId) {
    return res.status(400).send({ message: 'Invalid appointmentId' });
  }
  try {
    foundAppointment = await Appointment.findByPk(1);
  } catch (err) {
    console.error(err)
    res.status(500).send({message: err})
  }
  if (!foundAppointment) {
    res.status(408).send({message: "Запись не найдена"});
  }

  let hasUsers = null;
  try {
    hasUsers = await foundAppointment.hasUser();
    res.status(200).send({data: hasUsers, message: "Запись получена"});
  } catch (err) {
    console.error(err)
    res.status(500).send({message: err})
  }
  

}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const appointmentId = req.params.reservationId;
  const appointment = new Appointment({
    date: req.body.date ? req.body.date : null,
    time: req.body.time ? req.body.time : null,
    service: req.body.service ? req.body.service : null,
    master: req.body.master ? req.body.master : null,
    client: req.body.client ? req.body.client : null,
    version: req.body.version
  });

  Appointment.findById(appointmentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Appointment not found with id ${appointmentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Appointment with id " + appointmentId,
        });
      }
    } else {
      if (data.version < appointment.version || data.version === appointment.version) {
        Appointment.update(appointmentId, appointment, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Appointment not found with id ${appointmentId}.`,
              });
            } else {
              res.status(500).send({
                message: "Error updating Appointment with id " + appointmentId,
              });
            }
          } else res.status(200).send({data: data, message: "Запись обновлена"});
        });
      } else {
        res.status(409).send({
          message: "Somebody modified object simultaneously"
        });
      }
    }
  });
};

const appointmentController = {
  create: exports.create,
  getAppointments: exports.getAppointments,
  getAppointmentById: exports.getAppointmentById,
  checkAppointmentClients: exports.checkAppointmentClients,
  getAppointmentByClient: exports.getAppointmentByClient,
  update: exports.update
};
module.exports = appointmentController;
