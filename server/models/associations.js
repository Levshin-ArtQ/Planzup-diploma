const Admin = require("../models").admin;
const Appointment = require("../models").appointment;
const Notification = require("../models").notification;
const Client = require("../models").client;
const Salon = require("../models").salon;
const Schedule = require("../models").schedule;
const Period = require("../models").period;
const Post = require("../models").post;
const Clientbase = require("../models").clientbase;
const Clientcard = require("../models").clientcard;
const Service = require("../models").service;
const Settings = require("../models").settings;
const Manager = require("../models").manager;
const Master = require("../models").master;
const Report = require("../models").report;

const bcrypt = require("bcryptjs");

const associations = async () => {
  // CLIENT ASSOCIATIONS
  Notification.belongsToMany(Client, { through: "client_notifications" });
  Client.belongsToMany(Notification, { through: "client_notifications" });
  // client to clientcard one-to-one
  Client.hasOne(Clientcard);
  Clientcard.belongsTo(Client);
  // client to schedule one-to-one
  Client.hasOne(Schedule);
  Schedule.Client = Schedule.belongsTo(Client);
  // client to masters many-to-many
  await Client.belongsToMany(Master, {
    through: "client_masters",
  });
  await Master.belongsToMany(Client, {
    through: "client_masters",
  });
  // client to service many-to-many
  await Service.belongsToMany(Client, {
    through: "client_services",
    as: "favouriteServices",
  });
  await Client.belongsToMany(Service, {
    through: "client_services",
    as: "serviceFans",
  });
  // client to settings one-to-one
  await Client.hasOne(Settings);
  Settings.Client = Settings.belongsTo(Client);
  // client to notification one-to-many
  Client.Notifications = Client.hasMany(Notification);
  Notification.Clients = Notification.belongsTo(Client);

  // MASTER ASSOCIATIONS
  // master to settings one-to-one
  await Master.hasOne(Settings);
  await Settings.belongsTo(Master);
  // master to salons many-to-many
  await Master.belongsToMany(Salon, {
    through: "master_salons",
    allowNull: false, //
  });
  await Salon.belongsToMany(Master, {
    through: "master_salons",
  });
  // master to service many-to-many
  await Service.belongsToMany(Master, {
    through: "master_services",
  });
  await Master.belongsToMany(Service, {
    through: "master_services",
  });
  // master to schedule one-to-one
  Master.hasOne(Schedule);
  Schedule.Master = Schedule.belongsTo(Master);
  // master to notification one-to-many
  await Master.hasMany(Notification);
  await Notification.belongsTo(Master, {
    as: "Master",
  });
  // master to report one-to-many
  await Master.hasMany(Report);
  await Report.belongsTo(Master, {
    as: "Master",
  });

  // ADMIN ASSOCIATIONS

  // admin to salon many-to-many
  await Admin.belongsToMany(Salon, {
    through: "admin_salons",
  });
  await Salon.belongsToMany(Admin, {
    through: "admin_salons",
  });
  // admin to notification one-to-many
  await Admin.hasMany(Notification);
  await Notification.belongsTo(Admin, {
    as: "Admin",
  });
  // admin to settings one-to-one
  await Admin.hasOne(Settings);
  await Settings.belongsTo(Admin);

  // MANAGER ASSOCIATIONS

  // manager to notification one-to-many
  await Manager.hasMany(Notification);
  await Notification.belongsTo(Manager, {
    as: "Manager",
  });
  // manager to salon many-to-many
  await Salon.belongsToMany(Manager, {
    through: "manager_salons",
  });
  await Manager.belongsToMany(Salon, {
    through: "manager_salons",
  });
  // manager to settings one-to-one
  Manager.hasOne(Settings);
  Settings.belongsTo(Manager);

  // SALON ASSOCIATIONS

  // salon to schedule many-to-many
  // await Salon.belongsToMany(Schedule, {
  //   through: "salon_schedules",
  //   // foreignKey: "salonId",
  //   // otherKey: "scheduleId",
  // });
  // await Schedule.belongsToMany(Salon, {
  //   through: "salon_schedules",
  //   // foreignKey: "scheduleId",
  //   // otherKey: "salonId",
  // });
  // salon to service many-to-many
  Service.belongsToMany(Salon, {
    through: "salon_services",
  });
  Salon.belongsToMany(Service, {
    through: "salon_services",
  });
  // salon to clientbase many-to-many
  await Clientbase.belongsToMany(Salon, {
    through: "salon_clientbases",
  });
  await Salon.belongsToMany(Clientbase, {
    through: "salon_clientbases",
  });
  // salon to report many-to-many
  await Report.belongsToMany(Salon, {
    through: "salon_reports",
  });
  await Salon.belongsToMany(Report, {
    through: "salon_reports",
  });

  // SCHEDULE ASSOCIATIONS
  // schedule to period one-to-many
  await Schedule.hasMany(Period);
  await Period.belongsTo(Schedule);

  // CLIENTBASE ASSOCIATIONS

  // clientbase to clientcard many-to-many
  await Clientbase.belongsToMany(Clientcard, {
    through: "clientbase_clientcards",
    // foreignKey: "clientbaseId",
    // otherKey: "clientcardId",
  });
  await Clientcard.belongsToMany(Clientbase, {
    through: "clientbase_clientcards",
    // foreignKey: "clientcardId",
    // otherKey: "clientbaseId",
  });

  // APPPOINTMENT ASSOCIATIONS

  // appointment to service many-to-many
  await Appointment.belongsToMany(Service, {
    through: "appointment_services",
    // foreignKey: "appointmentId",
    // otherKey: "serviceId",
  });
  await Service.belongsToMany(Appointment, {
    through: "appointment_services",
    // foreignKey: "serviceId",
    // otherKey: "appointmentId",
    allowNull: false, // appointment cannot exist without service
  });
  // appointments to schedule many-to-many
  await Schedule.belongsToMany(Appointment, {
    through: "schedule_appointments",
    // foreignKey: "scheduleId",
  });
  await Appointment.belongsToMany(Schedule, {
    through: "schedule_appointments",
    // foreignKey: "appointmentId",
    onDelete: "SET NULL",
  });

  // NOTIFICATION ASSOCIATIONS
  // notification to appointment many-to-many
  await Notification.belongsToMany(Appointment, {
    through: "appointment_notifications",
    // foreignKey: "notificationId",
    // otherKey: "apointmentId",
  });
  await Appointment.belongsToMany(Notification, {
    through: "appointment_notifications",
    // foreignKey: "apointmentId",
    // otherKey: "notificationId",
    allowNull: false, // notification cannot exist without service
  });

  // REPORT ASSOCIATIONS

  //report to salon one-to-many
  await Report.belongsTo(Salon);
  await Salon.hasMany(Report);
  //report to master one-to-many
  Report.belongsTo(Master);
  Master.hasMany(Report);

  // POST ASSOCIATIONS

  // post to salon one-to-many
  await Post.belongsTo(Salon);
  await Salon.hasMany(Post);
  // post to master one-to-many
  await Post.belongsTo(Master);
  await Master.hasMany(Post);
};

Settings.prototype.validPassword = async function (password) {
  console.log("password: " + password);
  console.log("this.password: " + this.password);
  return await bcrypt
    .compare(password, this.password)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
// Settings.prototype.getUser = async function () {
//   const userModel = this.userType === "master" ? Master : "manager" ? Manager : "client" ? Client : null;
// };

module.exports = associations;
