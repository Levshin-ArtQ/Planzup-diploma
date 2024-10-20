const config = require("../config/db.config.js");
const bcrypt = require("bcryptjs");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST, 
        dialect: 'postgres', 
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: false
    },
  
);

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// actors
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.master = require("../models/master.model.js")(sequelize, Sequelize);
db.manager = require("../models/manager.model.js")(sequelize, Sequelize);
//representations
db.salon = require("../models/salon.model.js")(sequelize, Sequelize);
db.schedule = require("../models/schedule.model.js")(sequelize, Sequelize);
db.clientbase = require("../models/clientbase.model.js")(sequelize, Sequelize);
db.clientcard = require("../models/clientcard.model.js")(sequelize, Sequelize);
// events
db.notification = require("../models/notification.model.js")(sequelize, Sequelize);
db.appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
db.period = require("../models/period.model.js")(sequelize, Sequelize);
// products/services
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.settings = require("../models/settings.model.js")(sequelize, Sequelize);
// db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);
// associations docs: https://sequelize.org/docs/v6/core-concepts/assocs/
// associations docs: https://sequelize.org/master/manual/advanced-many-to-many.html
db.setAllAssociations = async () => {
  

// // CLIENT ASSOCIATIONS
// // client to appointment many-to-many
// db.client.belongsToMany(db.appointment, {
//   through: "client_appointments",
//   allowNull: false // appointment cannot exist without client
// });
// db.appointment.belongsToMany(db.client, {
//   through: "client_appointments"
// });
// // client to clientcard one-to-one
// db.client.hasOne(db.clientcard);
// db.clientcard.belongsTo(db.client);
// // client to schedule one
// db.client.hasOne(db.schedule);
// db.schedule.belongsTo(db.client);
// // client to notification one-to-many
// // db.client.hasMany(db.notification);
// // db.notification.belongsTo(db.client, {
// //   foreignKey: "clientId",
// //   as: "Client"
// // });
// // client to service many-to-many
// db.service.belongsToMany(db.client, {
//   through: "client_services",
//   foreignKey: "serviceId",
//   otherKey: "clientId"
// });
// db.client.belongsToMany(db.service, {
//   through: "client_services",
//   foreignKey: "clientId",
//   otherKey: "serviceId"
// });
// // client to schedule one-to-many
// db.client.hasMany(db.schedule);
// db.schedule.belongsTo(db.client);
// // client to settings one-to-one
// db.client.hasOne(db.settings);
// db.settings.belongsTo(db.client);


// // MASTER ASSOCIATIONS
// // master to salons many-to-many
// await db.master.belongsToMany(db.salon, {
//   through: "master_salons",
//   foreignKey: "masterId",
//   otherKey: "salonId",
//   allowNull: false
// });
// await db.salon.belongsToMany(db.master, {
//   through: "master_salons",
//   foreignKey: "salonId",
//   otherKey: "masterId"
// });
// // master to service many-to-many
// await db.service.belongsToMany(db.master, {
//   through: "master_services",
//   foreignKey: "serviceId",
//   otherKey: "masterId"
// });
// await db.master.belongsToMany(db.service, {
//   through: "master_services",
//   foreignKey: "masterId",
//   otherKey: "serviceId"
// });
// console.log('test ping')
// // master to appointment many-to-many
// db.master.belongsToMany(db.appointment, {
//   through: "master_appointments",
//   foreignKey: "masterId",
//   otherKey: "appointmentId" 
// })
// db.appointment.belongsToMany(db.master, {
//   through: "master_appointments",
//   foreignKey: "appointmentId",
//   otherKey: "masterId"
// });
// // master to schedule one-to-many
// db.master.belongsToMany(db.schedule, {through: "master_schedules"});
// db.schedule.belongsToMany(db.master,{ through: "master_schedules"});
// // master to notification one-to-many
// db.master.hasMany(db.notification);
// db.notification.belongsTo(db.master, {
//   foreignKey: "masterId",
//   as: "Master"
// });
// // master to settings one-to-one
// db.master.hasOne(db.settings);
// db.settings.belongsTo(db.master);

// // ADMIN ASSOCIATIONS
// // admin to salon many-to-many
// await db.admin.belongsToMany(db.salon, {
//   through: "admin_salons",
//   foreignKey: "adminId",
//   otherKey: "salonId"
// });
// await db.salon.belongsToMany(db.admin, {
//   through: "admin_salons",
//   foreignKey: "salonId",
//   otherKey: "adminId"
// });
// // admin to notification one-to-many
// db.admin.hasMany(db.notification);
// db.notification.belongsTo(db.admin, {
//   foreignKey: "adminId",
//   as: "Admin"
// });
// // admin to settings one-to-one
// db.admin.hasOne(db.settings);
// db.settings.belongsTo(db.admin);

// // MANAGER ASSOCIATIONS
// // manager to master many-to-many
// db.manager.belongsToMany(db.master, {
//   through: "manager_masters",
//   foreignKey: "managerId",
//   otherKey: "masterId"
// });
// db.master.belongsToMany(db.manager, {
//   through: "manager_masters",
//   foreignKey: "masterId",
//   otherKey: "managerId"
// });
// // manager to notification one-to-many
// db.manager.hasMany(db.notification);
// db.notification.belongsTo(db.manager, {
//   foreignKey: "managerId",
//   as: "Manager"
// });
// // manager to salon many-to-many
// await db.salon.belongsToMany(db.manager, {
//   through: "manager_salons",
//   // foreignKey: "salonId",
//   // otherKey: "managerId"
// });
// await db.manager.belongsToMany(db.salon, {
//   through: "manager_salons",
//   // foreignKey: "managerId",
//   // otherKey: "salonId"
// });
// // manager to settings one-to-one
// db.manager.hasOne(db.settings); 
// db.settings.belongsTo(db.manager);

// // SALON ASSOCIATIONS
// // salon to schedule many-to-many
// db.salon.belongsToMany(db.schedule, {
//   through: "salon_schedules",
//   foreignKey: "salonId",
//   otherKey: "scheduleId"
// });
// db.schedule.belongsToMany(db.salon, {
//   through: "salon_schedules",
//   foreignKey: "scheduleId",
//   otherKey: "salonId"
// });
// // salon to service many-to-many
// db.service.belongsToMany(db.salon, {
//   through: "salon_services",
//   foreignKey: "serviceId",
//   otherKey: "salonId"
// });
// db.salon.belongsToMany(db.service, {
//   through: "salon_services",
//   foreignKey: "salonId",
//   otherKey: "serviceId"
// });
// // salon to clientbase many-to-many
// db.clientbase.belongsToMany(db.salon, {
//   through: "salon_clientbases",
//   foreignKey: "clientbaseId",
//   otherKey: "salonId"
// });
// db.salon.belongsToMany(db.clientbase, {
//   through: "salon_clientbases",
//   foreignKey: "salonId",
//   otherKey: "clientbaseId"
// });

// // CLIENTCARD ASSOCIATIONS
// // clientcard to clientbase many-to-many
// db.clientcard.belongsToMany(db.clientbase, {
//   through: "clientbase_clientcards",
//   foreignKey: "clientcardId",
//   otherKey: "clientbaseId"
// });
// db.clientbase.belongsToMany(db.clientcard, {
//   through: "clientbase_clientcards",
//   foreignKey: "clientbaseId",
//   otherKey: "clientcardId"
// });

// // APPPOINTMENT ASSOCIATIONS
// // appointment to service many-to-many
// db.appointment.belongsToMany(db.service, {
//   through: "appointment_services",
//   foreignKey: "appointmentId",
//   otherKey: "serviceId"
// });
// db.service.belongsToMany(db.appointment, {
//   through: "appointment_services",
//   foreignKey: "serviceId",
//   otherKey: "appointmentId",
//   allowNull: false // appointment cannot exist without service
// });

// // NOTIFICATION ASSOCIATIONS
// // notification to service many-to-many TODO: not necessary
// db.notification.belongsToMany(db.service, {
//   through: "notification_services",
//   foreignKey: "notificationId",
//   otherKey: "serviceId"
// });
// db.service.belongsToMany(db.notification, {
//   through: "notification_services",
//   foreignKey: "serviceId",
//   otherKey: "notificationId",
//   allowNull: false // notification cannot exist without service
// });

// // REPORT ASSOCIATIONS



// // users to roles many-to-many
// db.role.belongsToMany(db.user, {
//   through: "user_roles", // role belongs to many users through user_roles junctions table
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles", // user belongs to many roles through user_roles junctions table
//   foreignKey: "userId",
//   otherKey: "roleId"
// });


// // users to notifications many-to-many
// db.notification.belongsToMany(db.user, {
//   through: "user_notifications", // notification belongs to many users through user_notifications junctions table
//   foreignKey: "notificationId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.notification, {
//   through: "user_notifications", // user belongs to many notifications through user_notifications junctions table
//   foreignKey: "userId",
//   otherKey: "notificationId"
// });



// // schedule to appointments many-to-many
// db.schedule.belongsToMany(db.appointment, {
//   through: "schedule_appointments",
// });
// db.appointment.belongsToMany(db.schedule, {
//   through: "schedule_appointments",
// });
// // user to appointments many-to-many
// db.user.hasMany(db.appointment);
// db.appointment.belongsTo(db.user);
// // appointment to user many-to-many
// db.appointment.belongsToMany(db.user, {
//   through: "appointment_users",
//   // foreignKey: "appointmentId",
//   // otherKey: "userId"
// });
// db.user.belongsToMany(db.appointment, {
//   through: "appointment_users",
//   // foreignKey: "userId",
//   // otherKey: "appointmentId"
// });



// db.ROLES = ["user", "admin", "moderator", "master"];
// db.settings.prototype.validPassword = async function (password) {
//   return await bcrypt.compare(password, this.password)
//     .then(result => {
//       console.log(this.password);
//       console.log(password);
//       return result
//     }).catch(err => {
//       console.log(err);
//     });
// };
}



module.exports = db;