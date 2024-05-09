module.exports = (TelegramBot, botToken) => {
  // инициализируем бота
  const bot = new TelegramBot(botToken, { polling: true });
  bot.setMyCommands([
    {command: '/start', description: 'Открыть миниприложение'},
    {command: '/info', description: 'Информация о боте'}
  ])

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg);
    if (text === '/start') {
       // так отправляем сообщение с inline кнопкой
      await bot.sendMessage(chatId, 'Под этим сообщением появится кнопка, по ней можно зайти в личный кабинет', {
      reply_markup: {
          inline_keyboard: [
            [{text: 'Запустить личный какбинет', web_app: {url: webAppUrl + param_string}}] // web_app - так указывается ссылка на мини приложение
          ]
      }
  })
    } else if (text === '/info') {
      bot.sendMessage(chatId, 'Информация о боте');
    } else if (text === '/link') { 
      bot.sendMessage(chatId, 'Ссылка на приложение');
    } else {
      bot.sendMessage(chatId, 'Неизвестная команда');
    }
    })
  bot.on("pollying_error", err => console.log(err.date.error.message));
  bot.on("polling_error", console.log);
  bot.on('web_app_data', (data) => {console.log(data.web_app_data.data);});
  
  return bot
}
