


const webPush = require('web-push');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dbRead = require('./models');


dbRead.sequelize
  .sync()
  .then((result) => {
    console.log("Database dropped resynced and connected");
  })
  .catch((err) => console.log(err));

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "planzup@mail.ru",
    pass: "hkmBDvfWtViqAfY1gjWJ", // TODO: hide to env
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // FIXME: use async/await
  // send mail with defined transport object
  // const info = await transporter.sendMail({
  //   from: '"Уведомление от PlanzUp 🗓️" <planzup@mail.ru>', // sender address
  //   to: "levshin.a74@mail.ru, planzup.team@gmail.com", // list of receivers
  //   subject: "PlanzUp будет присылать только уведомления о записях", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
  // FIXME:

  // const notifs = await dbRead.sequelize.query('SELECT * FROM notifications', {
  //   model: dbRead.notification,
  //   mapToModel: true, // pass true here if you have any mapped fields
  // });
  const notifs = await dbRead.notification.findAll({
    where: {
      status: 'pending',
      targetDate: {
        [dbRead.Sequelize.Op.gte]: new Date(),
        [dbRead.Sequelize.Op.lt]: new Date(new Date().setMinutes(new Date().getDate() + 5)),
      }
    }
  });
  const notifs2 = await dbRead.notification.findAll({
    where: {
      UID: 'af5bb25e-9088-4ed7-b8e9-d7fab9216093',
    }
  })
  console.log(notifs2);

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

const app = express();
app.use(bodyParser.json());

// Генерация VAPID ключей (выполняется один раз)
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys);
vapidKeys = {
  publicKey: 'BOSSP8ivAMvDHHMvMM_aX6kr70eDrKaiZ6ZU7QN6ftXeHC1HnGFrPvrJUgF04QExxCCNsK_Hdp83yFJNAbJSQik',
  privateKey: '_DoiEoKSwYKkxoIINRvp2Qb9pq4eZ3NFJDSxjPsvGYg'
}


// Конфигурация VAPID ключей
webPush.setVapidDetails(
  'mailto:planzup.team@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);



// Хранение подписок в массиве (или базе данных)
const subscriptions = [];

app.get('/', (req, res) => {
  res.status(201).json({});
});


app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).send('hello from notifications');
});

// Отправка уведомлений
app.post('/sendNotification', (req, res) => {
  const { title, body } = req.body;

  const notificationPayload = {
    title,
    body,
    icon: 'path_to_icon.png',
  };

  const promises = subscriptions.map(subscription =>
    webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
  );

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
    .catch(err => {
      console.error('Error sending notification', err);
      res.sendStatus(500);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
