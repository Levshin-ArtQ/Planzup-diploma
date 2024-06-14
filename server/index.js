const keys = require("./keys");
const { writeFileSync } = require("fs");
const sequelizeErd = require("sequelize-erd");
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const associations = require("./models/associations");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// routes


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/auth.routes")(app);
require("./routes/appointment.routes")(app);
require("./routes/super.routes")(app);
require("./routes/service.routes")(app);
require("./routes/client.routes")(app);
app.get("/api/auth/telegram", (req, res) => {
  // FIXME: add telegram auth https://edisonchee.com/writing/telegram-login-with-node.js/#bot-code
  console.log(req.query);
  res.redirect("/").status(200).send("successful got query"); // CONSIDER: redirect to https://t.me/PlanzUp_bot/PlanzUp_mini
});
// app.use("/reservations", require("./routes/reservations"));

const db = require("./models");
const main = async () => {
  const associationsAnswer = await associations()
    .then(
      console.log("associations done"),
    )
    .catch((err) => {
      console.log("associations failed");
      console.log(err);
    });
};
main();
// async part of code

const Role = db.role;
const sequelize = require("./util/database");
//sync database
db.sequelize
  .sync({ force: true })
  .then((result) => {
    console.log("Database dropped resynced and connected");
    initial();
    app.listen(5007);
    console.log("Listening port 5007");
  })
  .catch((err) => console.log(err));


function initial() {
  const { init } = require("./test/init.test");
  init().then(
    db.admin.create({
      username: "admin",
      firstName: "admin",
      password: "admin",
      role: "admin",  
    }).then((admin) => {
      db.salon.findAll().then((salons) => {
        admin.addSalons(salons)
          .then(() => {
            console.log('salons added to admin: ' + salons);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      console.log("admin created");
    })
  ).catch((err) => console.log(err));
}


// //test route
app.get("/", (req, res, next) => {
  res.send("Planzup listening");
});

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Postgres client setup
// const { Pool } = require("pg");
// const pgClient = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort
// });

// pgClient.on("connect", client => {
//   client
//     .query("CREATE TABLE IF NOT EXISTS values (number INT)")
//     .catch(err => console.log("PG ERROR", err));
// });