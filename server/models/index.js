const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: 'postgres', //better through to config and check why it is postgres and not localhost
        dialect: 'postgres',
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// actors
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.master = require("../models/master.model.js")(sequelize, Sequelize);
//representations
db.salon = require("../models/salon.model.js")(sequelize, Sequelize);
db.scehdule = require("../models/schedule.model.js")(sequelize, Sequelize);
// events
db.notification = require("../models/notification.model.js")(sequelize, Sequelize);
db.appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
// products/services
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);
// associations docs: https://sequelize.org/docs/v6/core-concepts/assocs/
// associations docs: https://sequelize.org/master/manual/advanced-many-to-many.html
// users to roles many-to-many
db.role.belongsToMany(db.user, {
  through: "user_roles", // role belongs to many users through user_roles junctions table
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles", // user belongs to many roles through user_roles junctions table
  foreignKey: "userId",
  otherKey: "roleId"
});
// salons to masters many-to-many
db.salon.hasMany(db.user, {
  foreignKey: "salonId",
  otherKey: "userId"
});
db.user.hasMany(db.salon, {
  foreignKey: "userId",
  otherKey: "salonId"
});

// users to notifications many-to-many
db.notification.belongsToMany(db.user, {
  through: "user_notifications", // notification belongs to many users through user_notifications junctions table
  foreignKey: "notificationId",
  otherKey: "userId"
});
db.user.belongsToMany(db.notification, {
  through: "user_notifications", // user belongs to many notifications through user_notifications junctions table
  foreignKey: "userId",
  otherKey: "notificationId"
});
// salons to clients many-to-many
db.salon.belongsToMany(db.user, {
  through: "clients_salons",
  foreignKey: "salonId",
  otherKey: "userId"
});
db.user.belongsToMany(db.salon, {
  through: "clients_salons",
  foreignKey: "userId",
  otherKey: "salonId"
});
// admin to salons many-to-many
db.admin.hasMany(db.salon, {
  foreignKey: "userId",
  otherKey: "salonId"
});
db.salon.hasMany(db.user, {
  foreignKey: "salonId",
  otherKey: "userId"
});
// master to salons one-to-many
db.master.hasMany(db.salon, {
  foreignKey: "userId",
  otherKey: "salonId"
});
db.salon.hasMany(db.user, {
  foreignKey: "salonId",
  otherKey: "userId"
});
// client to schedule one
db.client.hasOne(db.scehdule);
db.scehdule.belongsTo(db.client);
// master to schedule one-to-many
db.master.hasMany(db.scehdule);
db.scehdule.belongsTo(db.master);



db.ROLES = ["user", "admin", "moderator", "master"];

module.exports = db;