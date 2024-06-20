// create sample model entities for testing purposes, all models and connections between them
const config = require("../config/db.config.js");
const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes, where } = require("sequelize");
const { writeFileSync } = require("fs");
const sequelizeErd = require("sequelize-erd");

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


async function initSalon() {
  let adminSettings = await Settings.create({
    name: "adminSettings",
    email: "adminSettings.gmail.com",
    password: "123456",
    roles: 3,
    prefers_email: true,
    prefers_telegram: true,
  })
  let admin = await Admin.create({
    firstName: "admin",
    name: "admin",
    email: "levshin.a74@mail.ru",
    password: "123456",
    roles: 1,
  });

  await admin.setSetting(adminSettings);
  let salon = await Salon.create({
    name: "salon",
    email: "planzup.team@gmail.com",
    password: "123456",
    roles: 2,
  });

  await admin.addSalon(salon);

  let services = await Service.bulkCreate([
    { name: "Маникюр", description: "Маникюр с вниманием к каждому пальчику", catgory: "Маникюр", subcatgory: "Маникюр", price: 1000, duration: 60 },
    { name: "Педикур", description: "с заботой о каждом пальчике", price: 1050, duration: 60 },
    { name: "Стрижка", description: "Учтем ваш предыдущий опыт, подскажем какую стрижку вам выбрать в этот разы", price: 1000, duration: 60 },
  ]);

  await salon.addServices(services);
  let clientbase = await Clientbase.create({
    name: "clientbase",
    owner_name: "admin.name",
    email: "clientbase.gmail.com",
    password: "123456",
    roles: 4,
  })

  await salon.addClientbases(clientbase);

  let clientcards = await Clientcard.bulkCreate([
    {
      firstName: 'Иван',
      lastName: 'Иванов',
      description: 'Важный клиент',
      preferences: ['Массаж', 'Спа'],
      phone: '123456789',
      status: 'VIP',
      occupation: 'Бизнесмен',
      email: 'ivanov@example.com',
      loyaltyPoints: 120,
      favoriteMasters: ['Мастер 1'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Анна',
      lastName: 'Смирнова',
      description: 'Постоянный клиент',
      preferences: ['Маникюр', 'Педикюр'],
      phone: '987654321',
      status: 'regular',
      occupation: 'Учитель',
      email: 'smirnova@example.com',
      loyaltyPoints: 80,
      favoriteMasters: ['Мастер 2'],
      favoriteServices: ['Маникюр'],
    },
    {
      firstName: 'Олег',
      lastName: 'Петров',
      description: 'Отдыхает в саду',
      preferences: ['Сауна', 'Педикюр'],
      phone: '555555555',
      status: 'banned',
      occupation: 'Директор',
      email: 'petrov@example.com',
      loyaltyPoints: 60,
      favoriteMasters: ['Мастер 3'],
      favoriteServices: ['Сауна'],
    },
    {
      firstName: 'Елена',
      lastName: 'Иванова',
      description: 'Не любит купаться',
      preferences: ['Массаж', 'Соляриум'],
      phone: '666666666',
      status: 'regular',
      occupation: 'Дизайнер',
      email: 'ivanova@example.com',
      loyaltyPoints: 40,
      favoriteMasters: ['Мастер 4'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Дмитрий',
      lastName: 'Соколов',
      description: 'Любитель роскоши',
      preferences: ['Массаж', 'Спа'],
      phone: '777777777',
      status: 'VIP',
      occupation: 'Менеджер',
      email: 'sokolov@example.com',
      loyaltyPoints: 140,
      favoriteMasters: ['Мастер 5'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Екатерина',
      lastName: 'Петрова',
      description: 'Не очень умная, но лояльная',
      preferences: ['Массаж', 'Спа'],
      phone: '888888888',
      status: 'regular',
      occupation: 'Классическая балерина',
      email: 'petrova@example.com',
      loyaltyPoints: 100,
      favoriteMasters: ['Мастер 6'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Олег',
      lastName: 'Соколов',
      description: 'Любитель роскоши',
      preferences: ['Массаж', 'Спа'],
      phone: '999999999',
      status: 'VIP',
      occupation: 'Менеджер',
      email: 'sokolov@example.com',
      loyaltyPoints: 160,
      favoriteMasters: ['Мастер 7'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Елена',
      lastName: 'Иванова',
      description: 'Не очень умная, но лояльная',
      preferences: ['Массаж', 'Спа'],
      phone: '000000000',
      status: 'regular',
      occupation: 'Классическая балерина',
      email: 'ivanova@example.com',
      loyaltyPoints: 110,
      favoriteMasters: ['Мастер 8'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Дмитрий',
      lastName: 'Петров',
      description: 'Любитель роскоши',
      preferences: ['Массаж', 'Спа'],
      phone: '111111111',
      status: 'VIP',
      occupation: 'Менеджер',
      email: 'petrov@example.com',
      loyaltyPoints: 130,
      favoriteMasters: ['Мастер 9'],
      favoriteServices: ['Массаж'],
    },
    {
      firstName: 'Елена',
      lastName: 'Соколова',
      description: 'Не очень умная, но любит наслаждаться',
      preferences: ['Массаж', 'Спа'],
      phone: '222222222',
      status: 'VIP',
      occupation: 'Актриса',
      email: 'sokolova@example.com',
      loyaltyPoints: 150,
      favoriteMasters: ['Мастер 10'],
      favoriteServices: ['Массаж'],
    },
  ]);
  for (let clientcard of clientcards) {
    let client = await Client.create({
      firstName: clientcard.firstName,
      lastName: clientcard.lastName,
      email: clientcard.email,
      phone: clientcard.phone,
      email: clientcard.email,
      telegram: 'notg',
      settings: {
        firstName: clientcard.firstName,
        lastName: clientcard.lastName,
        email: clientcard.email,
        password: '57575757',
        phone: clientcard.phone,
      },
      schedule: {
        name: 'График записей и занятости',
        type: 'client',
        description: 'График записей и занятости',
      }
    },
    {
      include: [Schedule, Settings],
    });
    let settings = await Settings.create({
      firstName: clientcard.firstName,
      lastName: clientcard.lastName,
      email: clientcard.email,
      password: '57575757',
      phone: clientcard.phone,
    });

    clientcard.setClient(client);
  }
  


  await clientbase.addClientcards(clientcards)
  let masters = await Master.bulkCreate([
    { firstName: "Иван", lastName: "Иванов", rating: 4.5, services: ["Стрижка"] },
    { firstName: "Петр", lastName: "Петров", rating: 4.7, services: ["Маникюр"] },
    { firstName: "Сидор", lastName: "Сидоров", rating: 4.2, services: ["Массаж"] },
    { firstName: "Антон", lastName: "Антонов", rating: 4.8, services: ["Педикюр"] },
    { firstName: "Василий", lastName: "Васильев", rating: 4.9, services: ["Массаж"] },
  ]).then((masters) => {
    masters.map(async (master) => {
      console.log(master.dataValues.services)
      let settigns = await Settings.create({
        firstName: master.firstName,
        lastName: master.lastName,
        email: master.email,
        password: '57575757',
        phone: master.phone,
  
      })
      services.map(async (service) => {
        master.addService(service);
      })
    })
  });

  

  for (let index = 0; index < 10; index++) {
    let service = await Service.create({
      name: "service " + index,
      description: "описание услуги " + index,
      price: 1000,
    });
  }
  
  for (let i = 0; i < 20; i++) {
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
    // await masterSchedules[i].addPeriods(masterPeriods);
  }


  return admin;
}



module.exports.init = async () => {
  for (let index = 0; index < 10; index++) {
    try {
      let appointment = await Appointment.create({
        name: "appointment " + index,
        start: new Date("2023-09-19T16:00:00.000Z"),
        end: new Date("2023-09-19T19:00:00.000Z"),
        service: "service " + index,
        master: "master " + index,
        client: "client " + index,
      });
    } catch (err) {
      console.log(err);
    }
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

    

    // console.log(salonManager);
    let client = await Client.create(
      {
        name: "клиент " + index,
        firstName: "клиент " + index,
        email: "клиент " + index + "@gmail.com",
        password: "123456",
        roles: 3,
        notifications: [
          {
            name: "уведомление " + index,
            description: "описание rhf " + index,

          },
          {
            name: "уведомление " + index,
            description: "описание уведомления " + index,
          },
        ]
      },
      {
        include: [Notification]
        // include: [
        //   {
        //     association: Master,
        //   },
        // ]
      }
    );
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
      username: "пользователь " + index,
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

    salon.addService(service, index);
    admin.addSalon(salon, index);
    master.addSalon(salon, index);
    const salonManager = await manager.addSalon(salon);
    client.getMasters().then((data) => console.log(data));
    appointmentTest()
  }
  // bulkCreateTest()
  //   .then(() => console.log("bulkCreateTest done"))
  //   .catch((err) => console.log(err));

  initSalon().then(() => console.log("initSalon done")).catch((err) => console.log(err));
  
};

// create bulks of sample objects of settings, salons, managers, admins, clientbases, clientcards, services, masters, clients, schedules, appointments. using built in sequelize set and add methods make associations between these objects that are described in ../models/index.js file. Make concise and good Values for models' fields use Russian language
async function appointmentTest() {
  // create master with schedule and with periods in schedule
  const master = await Master.create({
    name: "Ефросиния",
    firstName: "Ефросиния",
    description: "описание мастера",
    photo: "https://s3.amazonaws.com/uifaces/faces/twitter/olegiv555/128.jpg",
    schedule: {
      name: "Расписнаия мастера Ефросиния",
      type: "master",
      description: "рассписание мастера",
    },
    settings: {
      name: "default",
      usertype: "master",
      username: "master",
      password: "123456",
    },
  },
  {
    include: [Schedule],
  },)


  Period.bulkCreate([
      {
        name: "период 1",
        start: new Date('2025-02-02 12:00'),
        type: "available",
        durationMinutes: 60,
      },
      {
        name: "период 2",
        start: new Date('2025-02-02 13:00'),
        type: "available",
        durationMinutes: 60,
      },
      {
        name: "период 3",
        start: new Date('2025-02-02 14:00'),
        type: "available",
        durationMinutes: 60,
      },
      {
        name: "период 4",
        start: new Date('2025-02-02 15:00'),
        type: "busy",
        durationMinutes: 60,
      },
    ],
  )
  // associate periods to schedule
}

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
      shardingSchedule: index % 2 === 0 ? true : false,
      name: "настройка " + index,
      username: "loginMaster" + index,
      usertype: "master",
      description: "описание настройки " + index,
      password: "password" + index,
      name: "имя " + index,
      prefers_telegram: index % 2 === 0 ? true : false,
    }))
  );

  const clients = await Client.bulkCreate(
    Array.from({ length: clientCount }, (_, index) => ({
      firstName:  "Ольга",
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
      shardingSchedule: index % 2 === 0 ? true : false,
      name: "настройка " + index,
      username: "loginClient" + index,
      usertype: "client",
      description: "описание настройки " + index,
      password: "password" + index,
      name: "имя " + index,
      prefers_telegram: index % 2 === 0 ? true : false,
    }))
  );

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
      start: `2024-07-02T10:00:00.000Z`,
      end: `2024-07-02T18:00:00.000Z`,
      cost: 1000 + index * 150,
      service: "услуга " + index,
      master: "мастер " + index,
      client: "клиент " + index,
    }))
  );

  // for (let i = 0; i < periodsMasters.length; i++) {
  //   console.log(periodsMasters[i].start.getHours(), periodsMasters[i].durationMinutes, periodsMasters[i].daypart);
  // }

  await Promise.all(
    clients.map((client, index) =>
      client.setSchedule(clientSchedules[index % clientCount])
    )
  );
  await Promise.all(
    clientSchedules.map((schedule, index) =>
      schedule.addAppointments(appointments)
    )
  );
  await Promise.all(
    clients.map((client, index) =>
      client.setSetting(clientSettings[index % clientCount])
    )
  );
  // await Promise.all(
  //   masterSchedules.map((schedule, index) => index%2 === 0 ? schedule.addPeriods(periodsMasters2) : schedule.addPeriods(periodsMasters))
  // )
  await Promise.all(
    masters.map((master, index) =>
      master.setSchedule(masterSchedules[index % masterCount])
    )
  );
  await Promise.all(
    masters.map((master, index) =>
      master.setSetting(masterSettings[index % clientCount])
    )
  );
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
  const svg = await sequelizeErd({
    source: db.sequelize,
    format: "svg",
    engine: "dot",
    // arrowShapes: {  // Any of the below 4 options formatted ['startShape', 'endShape']. If excluded, the default is used.
    //   BelongsToMany: ['none', 'none'],  // Default: ['none', 'crow']
    //   BelongsTo: ['none', 'none'], // Default: ['crow', 'none']
    //   HasMany: ['none', 'none'], // Default: ['none', 'crow']
    //   HasOne: ['none', 'none'], // Default: ['none', 'none']
    // },
    arrowSize: 5, // Default: 0.6
    lineWidth: 1, // Default: 0.75
  }); // sequelizeErd() returns a Promise
  writeFileSync("./db_diagramm.svg", svg);

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
