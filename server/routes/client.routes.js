const clientController = require("../controllers/client.controller");
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
  app.get("/client", clientController.getClient);
  app.put("/client/:clientId", clientController.updateClient);
  app.get("/client/schedule/:clientId", clientController.getClientSchedule);
  app.get("/client/schedule", clientController.getClientSchedule);
  app.get("/client/appointments/count", [verifyToken], clientController.getUpcomingAppointmentsCount);
  app.get("/client/appointments", [verifyToken], clientController.getUpcomingAppointments);
  app.delete("/client/appointments/:appointmentId", [verifyToken], clientController.deleteAppointment);
}