const appointmentController = require("../controllers/client.controller");
const { verifyToken, verifyClient } = require("../middleware/authJwt");

console.log("client routes")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/client", appointmentController.getClient);
  app.put("/client/:clientId", appointmentController.updateClient);
  app.get("/client/schedule/:clientId", appointmentController.getClientSchedule);
  app.get("/client/schedule", appointmentController.getClientSchedule);
  app.get("/client/appointments/count", [verifyToken], appointmentController.getUpcomingAppointmentsCount);
  app.get("/client/appointments", [verifyToken], appointmentController.getUpcomingAppointments);
}