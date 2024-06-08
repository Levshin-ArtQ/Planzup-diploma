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
    "/auth/signup/:userType",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );
  app.get("/auth/verifyToken", [verifyToken], controller.verifyToken);

  app.post("/auth/signin",  controller.signin);
};
