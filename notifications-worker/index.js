


const webPush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

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
