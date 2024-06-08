const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST, //better through to config and check why it is postgres and not localhost
        dialect: 'postgres', //better through to config
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: false
    },
  
);
// console.log(sequelize)

let dbRead={}
dbRead.Sequelize = Sequelize;
dbRead.sequelize = sequelize;

dbRead.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// events
dbRead.notification = require("../models/notification.model.js")(sequelize, Sequelize);
// dbRead.appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
dbRead.settings = require("../models/settings.model.js")(sequelize, Sequelize);

module.exports = dbRead;