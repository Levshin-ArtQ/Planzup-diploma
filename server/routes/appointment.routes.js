const appointmentController = require("../controllers/appointment.controller");
const { verifyToken, verifyClient } = require("../middleware/authJwt");

module.exports = function (app) {
  app.get("/api/appointments", appointmentController.getAppointments);
  app.get("/api/appointment/:reservationId", appointmentController.getAppointmentById);
  app.get("/api/appointment/client/:clientId", appointmentController.getAppointmentByClient);
  app.get("/api/appointment/hasclient/:appointmentId", appointmentController.checkAppointmentClients);
  app.post("/api/appointment", [verifyToken], appointmentController.create);
  app.put("/api/appointment/:reservationId", appointmentController.update);
  // app.delete("/appointment/:reservationId", appointmentController.delete);
} 