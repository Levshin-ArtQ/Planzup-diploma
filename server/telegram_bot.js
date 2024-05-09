// про установку node и npm https://blog.vistro.ru/dependency-management/how-to-install-nodejs-and-npm-on-windows/
// По сути импорты, 
// тут если терминал ругается на какой-то пакет, то его нужно установить через npm i <название пакета>
// Например: npm i node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const { user } = require('pg/lib/defaults');

// переменная хранит ссылку на мини приложение, сюда можно вставить любую валидную ссылку и она окроется во всплывашке telegram 
// const webAppUrl = 'https://3615-5-79-198-156.ngrok-free.app';
const webAppUrl = 'https://reference-tg-web-app.vercel.app'
const tutorialUrl = 'https://www.youtube.com/watch?v=MzO-0IYkZMU&t=884s';

// TODO: токент бота, его так хранить не стоит, это временное решение 
// token = '6275988545:AAGw1xaOVyIaM17YkV2teXC5BBNlZswSuas';
token = '6451579789:AAGc0DThN5YKKLBL5FoXDdAlvnm1k9TmSi4';
// FIXME: Мапы которые позже плавно переедут в бд
let tempUserMap = new Map();
let tempMessageMap = new Map();
let tempPollMap = new Map([['spec1', 0], ['spec2', 0], ['spec3', 0]]);  
// Инициируем бота прописывая в него токен
const bot = new TelegramBot(token, {polling: true});
// Пробрасываем поимку ошибок, в первом случае, если что-то не так с ТГ API
bot.on("pollying_error", err => console.log(err.date.error.message));
bot.on("polling_error", console.log); // Эта чаще всего выстреливает при общих синтаксичесских ошибках

bot.setMyCommands([
  {command: '/start', description: 'Открыть миниприложение'},
  {command: '/info', description: 'Информация о боте'}
])

bot.on('web_app_data', (data) => {
  console.log(data.web_app_data.data);


})


// bot.setChatMenuButton

// Костыль помогает менять текст в сообщении с результатами голосования
function refreshPollText() {
  console.log('poll refreshed');
  return 'Предварительные результаты голосования:' + 
  ' \nПервый специалист: ' + tempPollMap.get('spec1') + 
  ' \nВторой специалист: ' + tempPollMap.get('spec2') + 
  ' \nТретий специалист: ' + tempPollMap.get('spec3');
  
}


// Matches "/echo [whatever]"
// Эта штука отвечает за regexp текста отправленного пользователем, еще не проверял как оно работает
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

//function to get words after start message that are hidden after 
//connection via referall link with parameters 
bot.onText(/\/start (\w+)/, function (msg, match) {
	// console.log(msg)
	// console.log(match)
})


// Listen for any kind of message. There are different kinds of
// messages.
// тут бот просто реагирует на любой текст
bot.on('message', async (msg) => {
  // так достаем иформацию о том откуда отпралено сообщение и его текст
  const chatId = msg.chat.id;
  const text = msg.text;
  const username = msg.from.username;
  console.log('on message')
  console.log(chatId)

  bot.forwardMessage(-4073409748,chatId,msg.message_id)
  // Получение данных высланных из мини приложения
  if (msg?.web_app_data?.data) {
    log.console('data received')
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      bot.sendMessage(chatId, 'Получены данные из мини приложения');
    } catch(e) {
        log.console(e);
    }
    
  }
  // фто условие проверяет что отправлено start и мы находимся в личной переписке (не чате) с клиентом
  if((text === '/start') && msg.chat.type === 'private') {
    // добавляем параметры в ссылку на миниприложение
    let param_string = '';
    if (tempUserMap.has(username)) {
      param_string = '?master=' + tempUserMap.get(username);
    }
     // так отправляем сообщение с inline кнопкой
    await bot.sendMessage(chatId, 'Под этим сообщением появится кнопка, по ней можно зайти в личный кабинет', {
        reply_markup: {
            inline_keyboard: [
              [{text: 'Запустить личный какбинет', web_app: {url: webAppUrl + param_string}}] // web_app - так указывается ссылка на мини приложение
            ]
        }
    })

  } else if (text === '/link') {
    await bot.sendMessage(chatId, 'Перейти по ссылке https://t.me/SalonReservationBot?start=payload', {
        // 
    })

  } else if ((text === '/info') && msg.chat.type === 'private') {
    await bot.sendMessage(chatId, 'PlanzUp - будущая платформа онлайн-записи на услуги \nЭто бот проекта PlanzUp! \nОн может запускать мини-приложение \nСейчас мы его разрабатываем. Здесь можно ознакомиться с нашими наработками \nТакже в боте можно оставить ваши мысли и предолжения по проекту. Для этого отправьте сообщение боту. Будем очень рады обратной связи)', {
      reply_markup: {
          inline_keyboard: [
            [{text: '', web_app: {url: webAppUrl}}] // web_app - так указывается ссылка на мини приложение
          ]
      }
  })
    
  } else if (text === '/start' && msg.chat.type === 'group') {
    // в переменную promise записал данные о сообщеннии которое вот-вот отправится, работает только при await
    let promise = await bot.sendMessage(chatId, refreshPollText(), {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Хочу познакомиться с удобным прложением', url: 'https://t.me/SalonReservationBot?start=from_group'}], 
          // в ссылке на своего бота можно также пропихивать доп параметры, которые будет видеть только сам бот
        ]
      }
    })
    console.log('message_id', promise.message_id)
    tempMessageMap.set('poll_results_id', {chat_id: chatId, message_id: promise.message_id})
    await bot.sendMessage(chatId, 'Проголосуйте за понравившегося мастера', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Выбираю мастера 1', callback_data: 'spec1'}], // так в кнопки прописываются callback-и
          [{text: 'Выбрать мастера 2', callback_data: 'spec2'}],
          [{text: 'Выбрать мастера 3', callback_data: 'spec3'}],
        ]
      }
    })
    console.log(chatId);
  } 


// так отлавливаем callback 
  bot.on('callback_query', (query) => { // вот эти штуки называются стрелочные функци в js, это когда использется =>
    const action = query.data; 
    const msg = query.message;
    const username = query.from.username; 
    let text; 
   
    if (action.startsWith('spec')) { 
      let previous_choice = tempUserMap.get(username);
      let count = tempPollMap.get(action);
      let count_prev = tempPollMap.get(previous_choice);
      let flag = false;
      if (!count_prev) {
        tempPollMap.set(action, count + 1);
        flag = true;
      } else if (action === previous_choice) {
        console.log('same choice')
      } else {
        tempPollMap.set(action, count + 1);
        tempPollMap.set(previous_choice, count_prev - 1);
        flag = true;
      }
      if (flag) {
        const text = refreshPollText();
        bot.editMessageText(text, tempMessageMap.get('poll_results_id')); 
        tempUserMap.set(username, action);
      }
    } 

  });
});
