// create sample model entities for testing purposes, all models and connections between them
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

const Appointment = require("../models").appointment;
const User = require("../models").user;
const Role = require("../models/role.model");
const Schedule = require("../models/schedule.model");
const Service = require("../models/service.model");

module.exports.init = async () => {
  for (let i = 0; i < 10; i++) {
    let appointment = await Appointment.create({
      name: "appointment " + i,
      service: "service " + i,
      master: "master " + i,
      client: "client " + i,
    });

    let user = await User.create({
      firstName: "user " + i,
      email: "user" + i + "@gmail.com",
      password: "123456",
      roles: 1,
    });
    user.setAppointments(appointment);

  }

  // create sample model entities for testing purposes, all models and connections between them
  //
}