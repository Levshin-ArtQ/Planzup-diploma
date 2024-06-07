// create sample model entities for testing purposes, all models and connections between them
const config = require("../config/db.config.js");
const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes, where } = require("sequelize");

const Admin = require("../models").admin;
const Appointment = require("../models").appointment;
// const User = require("../models").user;
const Notification = require("../models").notification;
const Client = require("../models").client;
const Salon = require("../models").salon;
const Schedule = require("../models").schedule;
const Post = require("../models").post;
const Clientbase = require("../models").clientbase;
const Clientcard = require("../models").clientcard;
const Service = require("../models").service;
const Settings = require("../models").settings;
const Manager = require("../models").manager;
const Master = require("../models").master;
const Period = require("../models").period;
const db = require("../models/index");
const Role = require("../models/role.model");
// const Service = require("../models/service.model");

module.exports.init = async () => {
  for (let index = 0; index < 10; index++) {
    let appointment = await Appointment.create({
      name: "appointment " + index,
      service: "service " + index,
      master: "master " + index,
      client: "client " + index,
    });

    let master = await Master.create({
      name: "master " + index,
      firstName: "master " + index,
      email: "master " + index + "@gmail.com",
      password: "123456",
      roles: 3,
    });

    let service = await Service.create({
      name: "service " + index,
      description: "описание услуги " + index,
      price: 1000,
      duration: 60,
    });
    let salon = await Salon.create({
      name: "салон " + index,
      description: "описание салона " + index,
      address: "адрес салона " + index,
      latitude: 30,
      longitude: 40,
      phone: "телефон салона " + index,
      email: "salon@email" + index + ".com",
    });

    let manager = await Manager.create({
      name: "менеджер " + index,
      firstName: "менеджер " + index,
      email: "менеджер " + index + "@gmail.com",
      password: "123456",
      roles: 2,
    });

    let clientcard = await Clientcard.create({
      name: "карта " + index,
      firstName: "карта " + index,
      description: "описание карты " + index,
      image: "картинка карты " + index,
      price: 1000,
      duration: 60,
    });
    let clientbase = await Clientbase.create({
      name: "база " + index,
      description: "описание базы " + index,
      image: "картинка базы " + index,
      price: 1000,
      owner_name: "владелец базы " + index,
    });
    const salonManager = await manager.addSalon(salon);
    // console.log(salonManager);
    let client = await Client.create({
      name: "клиент " + index,
      firstName: "клиент " + index,
      email: "клиент " + index + "@gmail.com",
      password: "123456",
      roles: 3,
    });
    let admin = await Admin.create({
      name: "админ " + index,
      firstName: "админ " + index,
      email: "админ " + index + "@gmail.com",
      password: "123456",
      roles: 4,
    });
    // appointment.addClient(client);
    let notifications = await Notification.create({
      name: "уведомление " + index,
      description: "описание уведомления " + index,
    });
    notifications.addClient(client);
    let post = await Post.create({
      name: "пост " + index,
      description: "описание поста " + index,
    });
    // post.addClient(client);

    let settings = await Settings.create({
      name: "настройки " + index,
      description: "описание настроек " + index,
      password: "123456",
    });
    settings.setClient(client);
    let schedules = await Schedule.create({
      name: "график " + index,
      description: "описание графика " + index,
      date: "2020-01-01",
      time: "10:00",
    });
    schedules.setClient(client);
    admin.addSalon(salon, index);
    salon.addService(service, index);
    master.addSalon(salon, index);
    // appointment.addMaster(master, index);
    // master.addAppointment(appointment, index);
    appointment.addService(service, index);
    appointment.addSchedule(schedules, index);
    // clientcard.addClientbase(clientbase, index);
    // clientcard.addClientbase(clientbase);
    clientcard.setClient(client, index);
    // const client_appointments = await client.getAppointments({attributes: ['id']});

    // const client_appointments = await appointment.getClients();
    // console.log('clientSettings: ', JSON.stringify(client_appointments, null, 3));
  }
  bulkCreateTest()
    .then(() => console.log("bulkCreateTest done"))
    .catch((err) => console.log(err));
  // const data = await Salon.findAll(

  //   {
  //     include: Appointment,

  //   }
  // );
  // // const data2 = await data[0].getClients();

  // console.log('DATA: ', JSON.stringify(data[0], null, 3));
  // let settingsAdmin = await db.settings.create({
  //     name: "default",
  //     usertype: "admin",
  //     username: "admin",
  //     password: "123456",
  //   });
  //   console.log('password:      ', settingsAdmin.password);

  // let admin = await db.settings.scope('withPassword').findAll({
  //   where: {
  //     name: "default",
  //   }
  // }).then((result) => {
  //   return result;
  // }).catch((err) => {
  //   console.log('fetch failed')
  //   console.log(err);
  // });

  // console.log('password2:      ', admin[0].password);
  // // async () => await admin[0].validPassword("123456").then(result =>  console.log(result)).catch(err => console.log(err));
  // const checkAdminPassword = await admin[0].validPassword("123456");
  // const result = bcrypt.compareSync("123456", admin[0].password);
  // console.log(result);
  // console.log(checkAdminPassword);
  // const appoints = await Appointment.findAll(
  //   {
  //     include: {all: true},
  //   }
  // )
  // // console.log(JSON.stringify(appoints, null, 3));
  // const users = await User.findAll(
  //   {
  //     include: {all: true},
  //   }
  // )
  // console.log(JSON.stringify(users, null, 3));
  // const notifications = await Notification.findAll(
  //   {
  //     include: {all: true},
  //   }
  // )
  // // console.log('notifications ',JSON.stringify(notifications, null, 3));
  // const posts = await Post.findAll()
  // const clients = await Client.findAll(
  //   {
  //     include: {all: true},
  //   }
  // )
  // console.log('clients ',JSON.stringify(clients[0], null, 3));

  // create sample model entities for testing purposes, all models and connections between them
  //
};

// create bulks of sample objects of settings, salons, managers, admins, clientbases, clientcards, services, masters, clients, schedules, appointments. using built in sequelize set and add methods make associations between these objects that are described in ../models/index.js file. Make concise and good Values for models' fields use Russian language

async function bulkCreateTest() {
  // db.clientcard.belongsToMany(db.master, { through: "clientcard_master" });
  // db.master.belongsToMany(db.clientcard, { through: "clientcard_master" });
  db.sequelize.sync();
  // get all models as variables from db from capital letter
  const Setting = db.settings;
  const Salon = db.salon;
  const Manager = db.manager;
  const Admin = db.admin;
  const ClientBase = db.clientbase;
  const ClientCard = db.clientcard;
  const Service = db.service;
  const Master = db.master;
  const Client = db.client;
  // const Schedule = db.schedule;
  // const Appointment = db.appointment;

  const settingCount = 10;
  const salonCount = 10;
  const managerCount = 10;
  const adminCount = 10;
  const clientbaseCount = 10;
  const clientcardCount = 10;
  const serviceCount = 10;
  const masterCount = 10;
  const clientCount = 10;
  const scheduleCount = 10;
  const appointmentCount = 10;
  const periodCount = 3;

  const russiaLatitude = [50, 60];
  const russiaLongitude = [30, 150];
  const russiaLocations = [];
  for (let i = 0; i < 10; i++) {
    const randomLatitude =
      russiaLatitude[0] +
      Math.random() * (russiaLatitude[1] - russiaLatitude[0]);
    const randomLongitude =
      russiaLongitude[0] +
      Math.random() * (russiaLongitude[1] - russiaLongitude[0]);
    russiaLocations.push({
      latitude: randomLatitude,
      longitude: randomLongitude,
    });
  }

  const tags = ["new", "чай", "постоянный", "спящий", "изТГ", "тест"];

  const salons = await Salon.bulkCreate(
    Array.from({ length: salonCount }, (_, index) => ({
      name: "салон " + index,
      description: "описание салона " + index,
      address: "адрес салона " + index,
      latitude: russiaLocations[index].latitude,
      longitude: russiaLocations[index].longitude,
      phone: "телефон салона " + index,
      email: "email салона " + index,
    }))
  );

  const managers = await Manager.bulkCreate(
    Array.from({ length: managerCount }, (_, index) => ({
      firstName: "имя менеджера " + index,
      name: "менеджер " + index,
      surname: "фамилия менеджера " + index,
      phone: "телефон менеджера " + index,
      email: "email менеджера " + index,
    }))
  );

  const admins = await Admin.bulkCreate(
    Array.from({ length: adminCount }, (_, index) => ({
      name: "администратор " + index,
      firstName: "имя администратора " + index,
      firestName: "имя администратор " + index,
      surname: "фамилия администратора " + index,
      phone: "телефон администратора " + index,
      email: "email администратора " + index,
    }))
  );

  const clientbases = await ClientBase.bulkCreate(
    Array.from({ length: clientbaseCount }, (_, index) => ({
      firstName: "имя пользователя " + index,
      owner_name: "пользователь " + index,
      surname: "фамилия пользователя " + index,
      phone: "телефон пользователя " + index,
      email: "email пользователя " + index,
    }))
  );

  const clientcards = await ClientCard.bulkCreate(
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
      complement: "дополнение " + index,
    }))
  );

  const services = await Service.bulkCreate(
    Array.from({ length: serviceCount }, (_, index) => ({
      name: "услуга " + index,
      description: "описание услуги " + index,
      duration: 30 + index,
      price: 100 + index,
    }))
  );

  const masters = await Master.bulkCreate(
    Array.from({ length: masterCount }, (_, index) => ({
      firstName: "имя мастера " + index,
      lastName: "фамилия мастера " + index,
      name: "мастер " + index,
      surname: "фамилия мастера " + index,
      phone: "телефон мастера " + index,
      email: "email мастера " + index,
    }))
  );

  const masterSchedules = await Schedule.bulkCreate(
    Array.from({ length: masterCount }, (_, index) => ({
      name: "период " + index,
      description: "описание периода " + index,
      type: "master",
      description: "описание расписания мастера " + index,
    }))
  );

  const masterSettings = await Setting.bulkCreate(
    Array.from({ length: masterCount }, (_, index) => ({
      shardingSchedule: index%2 === 0 ? true : false,
      name: "настройка " + index,
      username: "loginMaster" + index,
      usertype: "master",
      description: "описание настройки " + index,
      password: "password" + index,
      name: "имя " + index,
      prefers_telegram: index%2 === 0 ? true : false,
    }))
  ) 

  const clients = await Client.bulkCreate(
    Array.from({ length: clientCount }, (_, index) => ({
      firstName: "имя клиента " + index,
      name: "клиент " + index,
      surname: "фамилия клиента " + index,
      phone: "телефон клиента " + index,
      email: "email клиента " + index,
    }))
  );

  const clientSchedules = await Schedule.bulkCreate(
    Array.from({ length: clientCount }, (_, index) => ({
      name: "период " + index,
      description: "описание периода " + index,
      type: "client",
      description: "описание расписания клиента " + index,
    }))
  );

  for (let i = 0; i < masterCount; i++) {
    const masterPeriods = await Period.bulkCreate([
      {
        start: new Date("2023-09-19T08:00:00.000Z"),
        end: new Date("2023-09-19T10:00:00.000Z"),
        available: false,
      },
      {
        start: new Date("2023-09-19T10:00:00.000Z"),
        end: new Date("2023-09-19T12:00:00.000Z"),
        available: true,
      },
      {
        start: new Date("2023-09-19T14:00:00.000Z"),
        end: new Date("2023-09-19T16:00:00.000Z"),
        available: true,
      },
      {
        start: new Date("2023-09-19T18:00:00.000Z"),
        end: new Date("2023-09-19T20:00:00.000Z"),
        available: true,
      },
      {
        start: new Date("2023-09-19T22:00:00.000Z"),
        end: new Date("2023-09-20T00:00:00.000Z"),
        available: false,
      },
    ]);
    await masterSchedules[i].addPeriods(masterPeriods);
  }

  const periodsMasters2 = await Period.bulkCreate([
    {
      start: new Date("2024-09-19T08:00:00.000Z"),
      end: new Date("2024-09-19T10:00:00.000Z"),
      available: false,
    },
    {
      start: new Date("2024-09-19T10:00:00.000Z"),
      // end: new Date("2024-09-19T12:00:00.000Z"),
      durationMinutes: 20,
      available: true,
    },
    {
      start: new Date("2024-09-19T14:00:00.000Z"),
      end: new Date("2024-09-19T16:00:00.000Z"),
      available: true,
    },
    {
      start: new Date("2024-09-19T18:00:00.000Z"),
      end: new Date("2024-09-19T20:00:00.000Z"),
      available: true,
    },
    {
      start: new Date("2024-09-19T22:00:00.000Z"),
      end: new Date("2024-09-20T00:00:00.000Z"),
      available: false,
    },
  ]);

  const clientSettings = await Setting.bulkCreate(
    Array.from({ length: clientCount }, (_, index) => ({
      shardingSchedule: index%2 === 0 ? true : false,
      name: "настройка " + index,
      username: "loginClient" + index,
      usertype: "client",
      description: "описание настройки " + index,
      password: "password" + index,
      name: "имя " + index,
      prefers_telegram: index%2 === 0 ? true : false,
    }))
  )

  const schedules = await Schedule.bulkCreate(
    Array.from({ length: scheduleCount }, (_, index) => ({
      date: "2023-12-12",
      startTime: "10:00:00",
      endTime: "18:00:00",
    }))
  );

  const appointments = await Appointment.bulkCreate(
    Array.from({ length: appointmentCount }, (_, index) => ({
      name: "запись " + index,
      service: "услуга " + index,
      master: "мастер " + index,
      client: "клиент " + index,
    }))
  );

  // for (let i = 0; i < periodsMasters.length; i++) {
  //   console.log(periodsMasters[i].start.getHours(), periodsMasters[i].durationMinutes, periodsMasters[i].daypart);
  // }

  await Promise.all(
    clients.map((client, index) => client.setSchedule(clientSchedules[index % clientCount]))
  )
  await Promise.all(
    clients.map((client, index) => client.setSetting(clientSettings[index % clientCount]))
  )
  // await Promise.all(
  //   masterSchedules.map((schedule, index) => index%2 === 0 ? schedule.addPeriods(periodsMasters2) : schedule.addPeriods(periodsMasters))
  // )
  await Promise.all(
    masters.map((master, index) => master.setSchedule(masterSchedules[index % masterCount]))
  )
  await Promise.all(
    masters.map((master, index) => master.setSetting(masterSettings[index % clientCount]))
  )
  await Promise.all(
    admins.map((admin, index) => {
      admin.addSalon(salons[index % salonCount]);
    })
  );
  await Promise.all(
    admins.map((admin, index) => {
      admin.addSalon(salons[index + (1 % salonCount)]);
    })
  );
  await Promise.all(
    salons.map((salon, index) =>
      salon.addManager(managers[index % managerCount])
    )
  );
  await Promise.all(
    services.map((service, index) =>
      service.addSalon(salons[index % salonCount])
    )
  );
  await Promise.all(
    services.map((service, index) =>
      service.addMaster(masters[index % masterCount])
    )
  );
  await Promise.all(
    salons.map((salon, index) => salon.addMaster(masters[index % masterCount]))
  );
  // await Promise.all(clientcards.map((clientcard, index) => clientcard.addClientBase(clientbases[index % clientbaseCount]))
  // await Promise.all(clients.map((client, index) => client.addClientCard(clientcards[index % clientcardCount]))
  // await Promise.all(appointments.map((appointment, index) => appointment.addClient(clients[index % clientCount])))
  await Promise.all(
    appointments.map((appointment, index) =>
      appointment.addService(services[index % serviceCount])
    )
  );
  // await Promise.all(appointments.map((appointment, index) => appointment.addMaster(masters[index % masterCount])))
  await Promise.all(
    appointments.map((appointment, index) =>
      appointment.addSchedule(schedules[index % scheduleCount])
    )
  );
  
  db.sequelize.sync();

  // const settingsgot = await clients[0].getSetting({
  //   where: {
  //     UID: clientSettings[0].UID
  //   }
  // });
  // console.log(appointments[0].UID);
  // console.log(settingsgot);
  // let fetchedCards = [];
  // const fetchedMasters = await Master.findAll();
  // fetchedCards = await fetchedMasters[0].getClientcards();
  // const someMaster = await Master.findOne();
  // fetchedCards = await someMaster.getClientcards();
  // console.log(fetchedMasters);
  // console.log(Master.tableName);

  // console.log(fetchedCards);

  // make a sample association query

  // const salonsFetched = await Salon.findAll({
  //   include: [
  //     {
  //       model: Manager
  //     }
  //   ]
  // })

  // console.log(salonsFetched);
}
