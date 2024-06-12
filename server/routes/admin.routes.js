const adminController = require("../controllers/admin.controller");
const { verifyToken, verifyClient } = require("../middleware/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admins", adminController.getAdmins);
  app.get("/api/admin/:adminId", [verifyToken, checkAdmin], adminController.getAdmin);
  app.get("/api/admin", [verifyToken, checkAdmin], adminController.getAdminWithSettings);
  app.put("/api/admin/:adminId", [verifyToken, checkAdmin], adminController.updateAdmin);
  app.post("/api/admin/salon", [verifyToken, checkAdmin], adminController.createSalon);
  app.post("/api/admin/salons", [verifyToken, checkAdmin], adminController.bulkCreateSalons);
  app.put("/api/salon/:salonId", [verifyToken, checkAdmin], adminController.updateSalon);
  app.post("/api/admin/salon/:salonId", [verifyToken, checkAdmin], adminController.addAdminToSalon);
  app.post("/api/manager/salon/:salonId", [verifyToken, checkAdmin], adminController.addManagerToSalon);
  app.post("/api/master/salon/:salonId", [verifyToken, checkAdmin], adminController.addMasterToSalon);
  // delete salon salonSchedule and salonServices with it's managers and admins if they don't have salons, leaves masters and clients
  app.delete("/api/salon/:salonId", [verifyToken, checkAdmin], adminController.deleteSalon); 
  app.delete("/api/admin/salon/:salonId", [verifyToken, checkAdmin], adminController.deleteAdmin);
  app.delete("/api/manager/salon/:salonId", [verifyToken, checkAdmin], adminController.deleteManager);
  app.delete("/api/master/salon/:salonId", [verifyToken, checkAdmin], adminController.deleteMaster);
  app.delete("/api/client/salon/:clientId", [verifyToken, checkAdmin], adminController.deleteClient);

}