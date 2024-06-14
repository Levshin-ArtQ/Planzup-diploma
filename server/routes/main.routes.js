const mainController = require("../controllers/main.controller");
const { verifyToken, verifyClient } = require("../middleware/authJwt");

console.log("main routes")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Обновить настройки, содержание внутри body
  app.put("/api/:userType/settings/", [verifyToken], mainController.updateSettings);
  app.get("/api/:userType/settings", [verifyToken], mainController.getSettings);
  
  // use common method for salons masters and services only provinding chosen model
  // if params are in body by then by them, else by all: id, type, name, address, masterId
  // можно икскать по name or description or address
  app.get("/api/salons", mainController.getSalons);
  app.get("/api/salons/:salonId", mainController.getSalonById); 
  app.post("/api/salons/:salonId", [verifyToken], mainController.getSalonById); 
  app.post("/api/salons", [verifyToken, verifyAdmin], mainController.createSalon);
  app.put("/api/salons/:salonId", [verifyToken, verifyAdminOrManager], mainController.updateSalon);

  // услуги
  app.get("/api/services", mainController.getServices);
  app.get("/api/services/:serviceId", mainController.getServiceById); 
  app.post("/api/services/:serviceId", mainController.getServiceById); 
  app.post("/api/services", [verifyToken, verifyAdmin], mainController.createService);
  app.put("/api/services/:serviceId", [verifyToken, verifyAdminOrManager], mainController.updateService);

  // мастера
  app.get("/api/masters", mainController.getSalons);
  app.get("/api/masters/:masterId", mainController.getSalonById); 
  app.get("/api/masters/:masterId/schedule", mainController.getSalonById);
  app.post("/api/masters/:masterId", [verifyToken], mainController.getSalonById); 
  app.post("/api/masters", [verifyToken, verifyAdmin], mainController.createSalon);
  app.put("/api/masters/:masterId", [verifyToken, verifyAdminOrManager], mainController.updateSalon);

  // userType is a current user - extra layer of security
  // app.get("/api/:userType/appointments", [verifyToken, checkUserType], mainController.getAppointments); 
  app.get("/api/:userType/appointments", [verifyToken, checkUserType], mainController.createAppointment); // userType = client or master/manager
  app.post("/api/:userType/appointments", [verifyToken, checkUserType], mainController.createAppointment); // userType = client or master/manager
  app.put("/api/:userType/appointments/:appointmentId", [verifyToken, checkUserType], mainController.update); // decline or postpone
  // get update schedule
  // app.get("/api/:userType/schedules", [verifyToken, checkUserType], mainController.getSchedule);
  // app.put("/api/:userType/schedules/:scheduleId", [verifyToken, checkUserType], mainController.updateSchedule); // user
  // app.put("/api/:userType/period/:periodId", [verifyToken], mainController.updatePeriod);
  app.get("/api/:userType/notifications", [verifyToken, checkUserType], mainController.getNotifications);
  app.put("/api/:userType/notifications/:notificationId", [verifyToken, checkUserType], mainController.updateNotification);

  // get salons clientbase
  app.get()


  // app.get("/api/:userType/period/:periodId", [verifyToken], mainController.getPeriod);
  // app.delete("/api/:userType/appointment/:appointmentId", [verifyToken], mainController.deleteAppointment); // cascade delete notifications, create new ones
}