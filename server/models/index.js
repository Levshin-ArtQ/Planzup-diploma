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
db.manager = require("../models/manager.model.js")(sequelize, Sequelize);
//representations
db.salon = require("../models/salon.model.js")(sequelize, Sequelize);
db.scehdule = require("../models/schedule.model.js")(sequelize, Sequelize);
db.clientbase = require("../models/clientbase.model.js")(sequelize, Sequelize);
db.clientcard = require("../models/clientcard.model.js")(sequelize, Sequelize);
// events
db.notification = require("../models/notification.model.js")(sequelize, Sequelize);
db.appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
// products/services
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
// db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);
// associations docs: https://sequelize.org/docs/v6/core-concepts/assocs/
// associations docs: https://sequelize.org/master/manual/advanced-many-to-many.html

// CLIENT ASSOCIATIONS
// client to appointment many-to-many
db.client.belongsToMany(db.appointment, {
  through: "client_appointments",
  allowNull: false // appointment cannot exist without client
});
db.appointment.belongsToMany(db.client, {
  through: "client_appointments"
});
// client to clientcard one-to-one
db.client.hasOne(db.clientcard);
db.clientcard.belongsTo(db.client);
// client to schedule one
db.client.hasOne(db.scehdule);
db.scehdule.belongsTo(db.client);
// client to notification one-to-many
db.client.hasMany(db.notification);
db.notification.belongsTo(db.client, {
  foreignKey: "clientId",
  as: "Client"
});
// client to service many-to-many
db.service.belongsToMany(db.client, {
  through: "client_services",
  foreignKey: "serviceId",
  otherKey: "clientId"
});
db.client.belongsToMany(db.service, {
  through: "client_services",
  foreignKey: "clientId",
  otherKey: "serviceId"
});
// client to schedule one-to-many
db.client.hasMany(db.scehdule);
db.scehdule.belongsTo(db.client);


// MASTER ASSOCIATIONS
// master to salons many-to-many
db.master.belongsToMany(db.salon, {
  through: "master_salons",
  foreignKey: "masterId",
  otherKey: "salonId",
  allowNull: false
});
db.salon.belongsToMany(db.master, {
  through: "master_salons",
  foreignKey: "salonId",
  otherKey: "masterId"
});
// master to service many-to-many
db.service.belongsToMany(db.master, {
  through: "master_services",
  foreignKey: "serviceId",
  otherKey: "masterId"
});
db.master.belongsToMany(db.service, {
  through: "master_services",
  foreignKey: "masterId",
  otherKey: "serviceId"
});
// master to appointment many-to-many
db.master.belongsToMany(db.appointment, {
  through: "master_appointments",
  foreignKey: "masterId",
  otherKey: "appointmentId" 
})
db.appointment.belongsToMany(db.master, {
  through: "master_appointments",
  foreignKey: "appointmentId",
  otherKey: "masterId"
});
// master to schedule one-to-many
db.master.hasMany(db.scehdule);
db.scehdule.belongsTo(db.master);
// master to notification one-to-many
db.master.hasMany(db.notification);
db.notification.belongsTo(db.master, {
  foreignKey: "masterId",
  as: "Master"
});

// ADMIN ASSOCIATIONS
// admin to salon many-to-many
db.admin.belongsToMany(db.salon, {
  through: "admin_salons",
  foreignKey: "adminId",
  otherKey: "salonId"
});
db.salon.belongsToMany(db.admin, {
  through: "admin_salons",
  foreignKey: "salonId",
  otherKey: "adminId"
});
// admin to notification one-to-many
db.admin.hasMany(db.notification);
db.notification.belongsTo(db.admin, {
  foreignKey: "adminId",
  as: "Admin"
});

// MANAGER ASSOCIATIONS
// manager to master many-to-many
db.manager.belongsToMany(db.master, {
  through: "manager_masters",
  foreignKey: "managerId",
  otherKey: "masterId"
});
db.master.belongsToMany(db.manager, {
  through: "manager_masters",
  foreignKey: "masterId",
  otherKey: "managerId"
});
// manager to notification one-to-many
db.manager.hasMany(db.notification);
db.notification.belongsTo(db.manager, {
  foreignKey: "managerId",
  as: "Manager"
});
// manager to salon many-to-many
db.salon.belongsToMany(db.manager, {
  through: "manager_salons",
  foreignKey: "salonId",
  otherKey: "managerId"
});
db.manager.belongsToMany(db.salon, {
  through: "manager_salons",
  foreignKey: "managerId",
  otherKey: "salonId"
});

// SALON ASSOCIATIONS
// salon to schedule many-to-many
db.salon.belongsToMany(db.scehdule, {
  through: "salon_schedules",
  foreignKey: "salonId",
  otherKey: "scheduleId"
});
db.scehdule.belongsToMany(db.salon, {
  through: "salon_schedules",
  foreignKey: "scheduleId",
  otherKey: "salonId"
});
// salon to service many-to-many
db.service.belongsToMany(db.salon, {
  through: "salon_services",
  foreignKey: "serviceId",
  otherKey: "salonId"
});
db.salon.belongsToMany(db.service, {
  through: "salon_services",
  foreignKey: "salonId",
  otherKey: "serviceId"
});
// salon to clientbase many-to-many
db.clientbase.belongsToMany(db.salon, {
  through: "salon_clientbases",
  foreignKey: "clientbaseId",
  otherKey: "salonId"
});
db.salon.belongsToMany(db.clientbase, {
  through: "salon_clientbases",
  foreignKey: "salonId",
  otherKey: "clientbaseId"
});

// CLIENTCARD ASSOCIATIONS
// clientcard to clientbase many-to-many
db.clientcard.belongsToMany(db.clientbase, {
  through: "clientbase_clientcards",
  foreignKey: "clientcardId",
  otherKey: "clientbaseId"
});
db.clientbase.belongsToMany(db.clientcard, {
  through: "clientbase_clientcards",
  foreignKey: "clientbaseId",
  otherKey: "clientcardId"
});

// APPPOINTMENT ASSOCIATIONS
// appointment to service many-to-many
db.appointment.belongsToMany(db.service, {
  through: "appointment_services",
  foreignKey: "appointmentId",
  otherKey: "serviceId"
});
db.service.belongsToMany(db.appointment, {
  through: "appointment_services",
  foreignKey: "serviceId",
  otherKey: "appointmentId",
  allowNull: false // appointment cannot exist without service
});

// NOTIFICATION ASSOCIATIONS
// notification to service many-to-many TODO: not necessary
db.notification.belongsToMany(db.service, {
  through: "notification_services",
  foreignKey: "notificationId",
  otherKey: "serviceId"
});
db.service.belongsToMany(db.notification, {
  through: "notification_services",
  foreignKey: "serviceId",
  otherKey: "notificationId",
  allowNull: false // notification cannot exist without service
});

// REPORT ASSOCIATIONS



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



// schedule to appointments many-to-many
// db.scehdule.hasMany(db.appointment);
// db.appointment.belongsTo(db.scehdule);
// user to appointments many-to-many
db.user.hasMany(db.appointment);
db.appointment.belongsTo(db.user);
// appointment to user many-to-many
db.appointment.hasMany(db.user);
db.user.belongsTo(db.appointment);



db.ROLES = ["user", "admin", "moderator", "master"];

module.exports = db;