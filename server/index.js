const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use(cors());
app.use(bodyParser.json());
app.use('/reservations', require('./routes/reservations'))


app.use(bodyParser.urlencoded({ extended: false })); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


const db = require("./models");
const Role = db.role;
const sequelize = require('./util/database');
//sync database
db.sequelize
  .sync({force: true})
  .then(result => {
    console.log("Database dropped resynced and connected");
    initial();
    app.listen(5000);
    console.log("Listening port 5000")
  })
  .catch(err => console.log(err));

  
  
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  
  Role.create({
    id: 2,
    name: "moderator"
  });
  
  Role.create({
    id: 3,
    name: "admin"
  });
}
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

// //test route
// app.get('/', (req, res, next) => {
//   res.send('Planzup listening');
// });

// //error handling
// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   res.status(status).json({ message: message });
// });


// // get the values
// app.get("/values/all", async (req, res) => {
//   const values = await pgClient.query("SELECT * FROM values");

//   res.send(values);
// });

// // now the post -> insert value
// app.post("/values", async (req, res) => {
//   if (!req.body.value) res.send({ working: false });

//   pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

//   res.send({ working: true });
// });


// app.listen(5000, err => {
//   console.log("Listening");
// });
