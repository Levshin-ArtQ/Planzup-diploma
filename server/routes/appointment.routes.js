const appointmentController = require("../controllers/appointment.controller");

module.exports = function (app) {
  app.get("/appointments", appointmentController.getAppointments);
  app.get("/appointment/:reservationId", appointmentController.getAppointmentById);
  app.get("/appointment/client/:clientId", appointmentController.getAppointmentByClient);
  app.get("/appointment/hasclient/:appointmentId", appointmentController.checkAppointmentClients);
  app.post("/appointment", appointmentController.create);
  app.put("/appointment/:reservationId", appointmentController.update);
  // app.delete("/appointment/:reservationId", appointmentController.delete);
} 