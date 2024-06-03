const { verifySignUp } = require("../middleware");
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
  app.get("/api/values/all", (req, res, next) => {
    res.status(200).json({ values: "simple answer" });
  });

  app.post("/api/auth/signin", controller.signin);
};
