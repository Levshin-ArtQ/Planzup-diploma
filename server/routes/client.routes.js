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
  app.get("/api/client", clientController.getClient);
  app.put("/api/client/:clientId", clientController.updateClient);
  app.get("/api/client/schedule/:clientId", clientController.getClientSchedule);
  app.get("/api/client/schedule", clientController.getClientSchedule);
  app.get("api/client/appointments/count", [verifyToken], clientController.getUpcomingAppointmentsCount);
  app.get("/api/client/appointments", [verifyToken], clientController.getUpcomingAppointments);
  app.delete("/api/client/appointments/:appointmentId", [verifyToken], clientController.deleteAppointment);
}