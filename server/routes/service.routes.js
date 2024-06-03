const serviceController = require("../controllers/service.controller");

module.exports = function (app) {
  app.get("/service", serviceController.getServices);
  app.get("/service/:serviceId", serviceController.getServiceById);
  // app.delete("/appointment/:reservationId", serviceController.delete);
} 