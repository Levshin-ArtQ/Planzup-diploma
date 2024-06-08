const appointmentController = require("../controllers/client.controller");

module.exports = function (app) {
  console.log("client routes")
  app.get("/client", appointmentController.getClient);
  app.put("/client/:clientId", appointmentController.updateClient);
  app.get("/client/schedule/:clientId", appointmentController.getClientSchedule);
  app.get("/client/schedule", appointmentController.getClientSchedule);
  app.get("/client/appointments/count", appointmentController.getUpcomingAppointmentsCount);
}