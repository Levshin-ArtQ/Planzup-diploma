// create sample model entities for testing purposes, all models and connections between them
const config = require("../config/db.config.js");
const bcrypt = require("bcryptjs");
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
const db = require("../models/index");
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
  let settingsAdmin = await db.settings.create({
      name: "default",
      usertype: "admin",
      username: "admin",
      password: "123456",
    });
    console.log('password:      ', settingsAdmin.password);

  let admin = await db.settings.scope('withPassword').findAll({
    where: {
      name: "default",
    }
  }).then((result) => {
    return result;
  }).catch((err) => {
    console.log(err);
  });
  console.log('password2:      ', admin[0].password);
  // async () => await admin[0].validPassword("123456").then(result =>  console.log(result)).catch(err => console.log(err));
  const checkAdminPassword = await admin[0].validPassword("123456");
  const result = bcrypt.compareSync("123456", admin[0].password);
  console.log(result);
  console.log(checkAdminPassword);
  // create sample model entities for testing purposes, all models and connections between them
  //
}


// create bulks of sample objects of settings, salons, managers, admins, clientbases, clientcards, services, masters, clients, schedules, appointments. using built in sequelize set and add methods make associations between these objects that are described in ../models/index.js file. Make concise and good Values for models' fields use Russian language

async function bulkCreate() {
  const settingCount = 10
  const salonCount = 10
  const managerCount = 10
  const adminCount = 10
  const clientbaseCount = 10
  const clientcardCount = 10
  const serviceCount = 10
  const masterCount = 10
  const clientCount = 10
  const scheduleCount = 10
  const appointmentCount = 10


  const russiaLatitude = [50, 60];
  const russiaLongitude = [30, 150];
  const russiaLocations = [];
  for (let i = 0; i < 10; i++) {
    const randomLatitude = russiaLatitude[0] + Math.random() * (russiaLatitude[1] - russiaLatitude[0]);
    const randomLongitude = russiaLongitude[0] + Math.random() * (russiaLongitude[1] - russiaLongitude[0]);
    russiaLocations.push({ latitude: randomLatitude, longitude: randomLongitude });
  }


  const tags = ['new', 'чай', 'постоянный', 'спящий', 'изТГ', 'тест']

  const settings = await db.settings.bulkCreate(
    Array.from({ length: settingCount }, (_, index) => ({
      name: "настройки " + index,
      usertype: "администратор",
      username: "администратор " + index,
      password: "123456"
    }))
  )

  const salons = await db.salon.bulkCreate(
    Array.from({ length: salonCount }, (_, index) => ({
      name: "салон " + index,
      description: "описание салона " + index,
      address: "адрес салона " + index,
      latitude: russiaLocations[index].latitude,
      longitude: russiaLocations[index].longitude,
      phone: "телефон салона " + index,
      email: "email салона " + index
    }))
  )

  const managers = await db.manager.bulkCreate(
    Array.from({ length: managerCount }, (_, index) => ({
      firstName: "имя менеджера " + index,
      name: "менеджер " + index,
      surname: "фамилия менеджера " + index,
      phone: "телефон менеджера " + index,
      email: "email менеджера " + index
    }))
  )

  const admins = await db.admin.bulkCreate(
    Array.from({ length: adminCount }, (_, index) => ({
      name: "администратор " + index,
      firstName: "имя администратора " + index,
      firestName: "имя администратор " + index,
      surname: "фамилия администратора " + index,
      phone: "телефон администратора " + index,
      email: "email администратора " + index
    }))
  )

  const clientbases = await db.clientbase.bulkCreate(
    Array.from({ length: clientbaseCount }, (_, index) => ({
      firstName: "имя пользователя " + index,
      owner_name: "пользователь " + index,
      surname: "фамилия пользователя " + index,
      phone: "телефон пользователя " + index,
      email: "email пользователя " + index
    }))
  )

  const clientcards = await db.clientcard.bulkCreate(
    Array.from({ length: clientcardCount }, (_, index) => ({
      cpf: "123456789" + index,
      birthday: "1999-12-12",
      firstName: "имя пользователя " + index,
      block: "123456789" + index,
      register: "123456789" + index,
      zipcode: "12345-678",
      address: "улица " + index,
      district: "район " + index,
      city: "город " + index,
      state: "область " + index,
      complement: "дополнение " + index
    }))
  )

  const services = await db.service.bulkCreate(
    Array.from({ length: serviceCount }, (_, index) => ({
      name: "услуга " + index,
      description: "описание услуги " + index,
      duration: 30 + index,
      price: 100 + index
    }))
  )

  const masters = await db.master.bulkCreate(
    Array.from({ length: masterCount }, (_, index) => ({
      firstName: "имя мастера " + index,
      name: "мастер " + index,
      surname: "фамилия мастера " + index,
      phone: "телефон мастера " + index,
      email: "email мастера " + index
    }))
  )

  const clients = await db.client.bulkCreate(
    Array.from({ length: clientCount }, (_, index) => ({
      firstName: "имя клиента " + index,
      name: "клиент " + index,
      surname: "фамилия клиента " + index,
      phone: "телефон клиента " + index,
      email: "email клиента " + index
    }))
  )

  const schedules = await db.scehdule.bulkCreate(
    Array.from({ length: scheduleCount }, (_, index) => ({
      date: "2023-12-12",
      startTime: "10:00:00",
      endTime: "18:00:00"
    }))
  )

  const appointments = await db.appointment.bulkCreate(
    Array.from({ length: appointmentCount }, (_, index) => ({
      name: "запись " + index,
      service: "услуга " + index,
      master: "мастер " + index,
      client: "клиент " + index
    }))
  )
  await Promise.all(admins.map((admin, index) => {admin.addSalon(salons[index % salonCount])}))
  await Promise.all(salons.map((salon, index) => salon.addManager(managers[index % managerCount])))
  await Promise.all(services.map((service, index) => service.addSalon(salons[index % salonCount])))
  await Promise.all(services.map((service, index) => service.addMaster(masters[index % masterCount])))
  // await Promise.all(clientcards.map((clientcard, index) => clientcard.addClientBase(clientbases[index % clientbaseCount])))
  // await Promise.all(clients.map((client, index) => client.addClientCard(clientcards[index % clientcardCount])))
  await Promise.all(appointments.map((appointment, index) => appointment.addClient(clients[index % clientCount])))
  await Promise.all(appointments.map((appointment, index) => appointment.addService(services[index % serviceCount])))
  await Promise.all(appointments.map((appointment, index) => appointment.addMaster(masters[index % masterCount])))
  await Promise.all(appointments.map((appointment, index) => appointment.addSchedule(schedules[index % scheduleCount])))
  
}

bulkCreate().then(() => {
  console.log("bulkCreate done")
}).catch(err => {
  console.error(err)
})











