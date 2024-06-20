const { verifySignUp } = require("../middleware");
const { verifyToken } = require("../middleware/authJwt");

const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  console.log("auth routes")
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup/:userType",
    [verifySignUp.checkDuplicateUsernameOrEmail,],
    controller.signup
  );
  app.post("/api/auth/verifyToken", 
    [verifyToken], 
    controller.verifyToken
  );
  app.post(
    "/api/auth/signin",  
    controller.signin
  );
};
