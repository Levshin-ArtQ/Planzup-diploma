const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const superController = require("../controllers/super.controller.js");
module.exports = function (app) { 
  console.log("super routes")
  app.get("/super/salon", superController.getSalonsDeep);

  // app.post("/api/super/signin", superController.signin);
  // app.post("/api/super/signup", superController.signup);
}
