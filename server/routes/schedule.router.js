const scheduleController 
  = require("../controllers/schedule.controller");
module.exports = function (app) {
  app.get("/schedules", 
    scheduleController.getSchedules);
  app.get("/schedule/:scheduleId", 
    scheduleController.getScheduleById);
  app.get("/schedule/client/:clientId", 
    scheduleController.getScheduleByClient);
  app.get("/schedule/hasclient/:scheduleId", 
    scheduleController.checkScheduleClients);
  app.post("/schedule", 
    scheduleController.create);
  app.put("/schedule/:scheduleId", 
    scheduleController.update);
  app.delete("/schedule/:scheduleId", 
    scheduleController.delete); 
} 