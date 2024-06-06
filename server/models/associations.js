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
  await Notification.belongsToMany(Client, { through: "client_notifications" });
  await Client.belongsToMany(Notification, { through: "client_notifications" });
  // client to clientcard one-to-one
  Client.hasOne(Clientcard);
  Clientcard.belongsTo(Client);
  // client to schedule one-to-one
  Client.hasOne(Schedule);
  Schedule.belongsTo(Client);
  // client to masters many-to-many
  Client.belongsToMany(Master, {
    through: "client_masters",
    foreignKey: "clientId",
    otherKey: "masterId",
    as: "favouriteMasters",
  });
  Master.belongsToMany(Client, {
    through: "client_masters",
    foreignKey: "masterId",
    otherKey: "clientId",
    as: "masterFans",
  });
  // client to service many-to-many
  Service.belongsToMany(Client, {
    through: "client_services",
    foreignKey: "serviceId",
    otherKey: "clientId",
    as: "favouriteServices",
  });
  Client.belongsToMany(Service, {
    through: "client_services",
    foreignKey: "clientId",
    otherKey: "serviceId",
    as: "serviceFans",
  });
  // client to settings one-to-one
  Client.hasOne(Settings);
  Settings.belongsTo(Client);
  // client to notification one-to-many
  Client.hasMany(Notification);
  Notification.belongsTo(Client);
  


  // MASTER ASSOCIATIONS
  // master to settings one-to-one
  Master.hasOne(Settings);
  Settings.belongsTo(Master);
  // master to salons many-to-many
  await Master.belongsToMany(Salon, {
    through: "master_salons",
    foreignKey: "masterId",
    otherKey: "salonId",
    allowNull: false,
  });
  await Salon.belongsToMany(Master, {
    through: "master_salons",
    foreignKey: "salonId",
    otherKey: "masterId",
  });
  // master to service many-to-many
  await Service.belongsToMany(Master, {
    through: "master_services",
    foreignKey: "serviceId",
    otherKey: "masterId",
  });
  await Master.belongsToMany(Service, {
    through: "master_services",
    foreignKey: "masterId",
    otherKey: "serviceId",
  });
  // master to schedule one-to-one
  Master.hasOne(Schedule);
  Schedule.belongsTo(Master);
  // master to notification one-to-many
  Master.hasMany(Notification);
  Notification.belongsTo(Master, {
    foreignKey: "masterId",
    as: "Master",
  });
  // master to report one-to-many
  Master.hasMany(Report);
  Report.belongsTo(Master, {
    foreignKey: "masterId",
    as: "Master",
  });


  // ADMIN ASSOCIATIONS

  // admin to salon many-to-many
  await Admin.belongsToMany(Salon, {
    through: "admin_salons",
    foreignKey: "adminId",
    otherKey: "salonId",
  });
  await Salon.belongsToMany(Admin, {
    through: "admin_salons",
    foreignKey: "salonId",
    otherKey: "adminId",
  });
  // admin to notification one-to-many
  Admin.hasMany(Notification);
  Notification.belongsTo(Admin, {
    foreignKey: "adminId",
    as: "Admin",
  });
  // admin to settings one-to-one
  Admin.hasOne(Settings);
  Settings.belongsTo(Admin);


  // MANAGER ASSOCIATIONS
  
  // manager to notification one-to-many
  Manager.hasMany(Notification);
  Notification.belongsTo(Manager, {
    foreignKey: "managerId",
    as: "Manager",
  });
  // manager to salon many-to-many
  await Salon.belongsToMany(Manager, {
    through: "manager_salons",
    // foreignKey: "salonId",
    // otherKey: "managerId"
  });
  await Manager.belongsToMany(Salon, {
    through: "manager_salons",
    // foreignKey: "managerId",
    // otherKey: "salonId"
  });
  // manager to settings one-to-one
  Manager.hasOne(Settings);
  Settings.belongsTo(Manager);


  // SALON ASSOCIATIONS

  // salon to schedule many-to-many
  Salon.belongsToMany(Schedule, {
    through: "salon_schedules",
    foreignKey: "salonId",
    otherKey: "scheduleId",
  });
  Schedule.belongsToMany(Salon, {
    through: "salon_schedules",
    foreignKey: "scheduleId",
    otherKey: "salonId",
  });
  // salon to service many-to-many
  Service.belongsToMany(Salon, {
    through: "salon_services",
    foreignKey: "serviceId",
    otherKey: "salonId",
  });
  Salon.belongsToMany(Service, {
    through: "salon_services",
    foreignKey: "salonId",
    otherKey: "serviceId",
  });
  // salon to clientbase many-to-many
  Clientbase.belongsToMany(Salon, {
    through: "salon_clientbases",
    foreignKey: "clientbaseId",
    otherKey: "salonId",
  });
  Salon.belongsToMany(Clientbase, {
    through: "salon_clientbases",
    foreignKey: "salonId",
    otherKey: "clientbaseId",
  });
  // salon to report many-to-many
  Report.belongsToMany(Salon, {
    through: "salon_reports",
    foreignKey: "reportId",
    otherKey: "salonId",
  });
  Salon.belongsToMany(Report, {
    through: "salon_reports",
    foreignKey: "salonId",
    otherKey: "reportId",
  });

  // SCHEDULE ASSOCIATIONS
  // schedule to period one-to-many
  Schedule.hasMany(Period);
  Period.belongsTo(Schedule);


  // CLIENTBASE ASSOCIATIONS

  // clientbase to clientcard many-to-many
  Clientbase.belongsToMany(Clientcard, {
    through: "clientbase_clientcards",
    foreignKey: "clientbaseId",
    otherKey: "clientcardId",
  });
  Clientcard.belongsToMany(Clientbase, {
    through: "clientbase_clientcards",
    foreignKey: "clientcardId",
    otherKey: "clientbaseId",
  });
  

  // APPPOINTMENT ASSOCIATIONS

  // appointment to service many-to-many
  Appointment.belongsToMany(Service, {
    through: "appointment_services",
    foreignKey: "appointmentId",
    otherKey: "serviceId",
  });
  Service.belongsToMany(Appointment, {
    through: "appointment_services",
    foreignKey: "serviceId",
    otherKey: "appointmentId",
    allowNull: false, // appointment cannot exist without service
  });
  // appointments to schedule many-to-many
  Schedule.belongsToMany(Appointment, {
    through: "schedule_appointments",
    foreignKey: "scheduleId",
  });
  Appointment.belongsToMany(Schedule, {
    through: "schedule_appointments",
    foreignKey: "appointmentId",
    onDelete: "SET NULL",
  });

  // NOTIFICATION ASSOCIATIONS
  // notification to appointment many-to-many 
  Notification.belongsToMany(Appointment, {
    through: "appointment_notifications",
    foreignKey: "notificationId",
    otherKey: "apointmentId",
  });
  Appointment.belongsToMany(Notification, {
    through: "appointment_notifications",
    foreignKey: "apointmentId",
    otherKey: "notificationId",
    allowNull: false, // notification cannot exist without service
  });
  

  // REPORT ASSOCIATIONS

  //report to salon one-to-many
  Report.belongsTo(Salon);
  Salon.hasMany(Report);
  //report to master one-to-many
  Report.belongsTo(Master);
  Master.hasMany(Report);

  
  // POST ASSOCIATIONS

  // post to salon one-to-many
  Post.belongsTo(Salon);
  Salon.hasMany(Post);
  // post to master one-to-many
  Post.belongsTo(Master);
  Master.hasMany(Post);

  // db.ROLES = ["user", "admin", "moderator", "master"];
  Settings.prototype.validPassword = async function (password) {
    console.log("password: " + password)
    console.log("this.password: " + this.password)
    return await bcrypt
      .compare(password, this.password)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return false
        
      });
  };
  // Settings.prototype.getUser = async function () {
  //   const userModel = this.userType === "master" ? Master : "manager" ? Manager : "client" ? Client : null;
  // };

};

module.exports = associations;
