const appointmentController = require("../controllers/salon.controller");

module.exports = function (app) {
  app.get("/salon", appointmentController.getAppointments);
  // app.delete("/appointment/:reservationId", appointmentController.delete);
} 