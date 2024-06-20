const botConfig = require("./config/bot.config");
module.exports = (TelegramBot, botToken) => {
  // инициализируем бота
  const bot = new TelegramBot(botToken, { polling: true });
  const param_string = "";
  bot.setMyCommands([
    { command: "/start", description: "Открыть миниприложение" },
    { command: "/info", description: "Информация о боте" },
  ]);
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg);
    // await bot.sendMessage(
    //   botConfig.adminChatId,
    //   `Пользователь ${msg.from.first_name} ${msg.from.last_name} (${msg.from.id}) написал: ${text} из чата ${chatId}`
    // )
    if (text === "/start") {
      // так отправляем сообщение с inline кнопкой
      await bot.sendMessage(
        chatId,
        "Здравствуйте! Это помощник PlanzUp. Я хочу помочь вам записаться онлайн. Под этим сообщением появится кнопка, по ней можно зайти в личный кабинет и забронировать сеанс. Если вам интересно, как это работает нажмите /info",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Записаться онлайн!",
                  web_app: { url: botConfig.webAppUrl + param_string },
                },
              ], // web_app - так указывается ссылка на мини приложение
            ],
          },
        }
      );
    } else if (text === "/info") {
      bot.sendMessage(
        chatId,
        "PlanzUp — современный веб-сервис для онлайн-записи на услуги.В нашем решении используются технологии PWA и мини-приложений. Мини-приложение работает внутри мессенджера, например, как это в Telegram, и предоставляет пользователям быстрый и удобный доступ к определенным функциям. Например, вы сможете быстро забронировать услугу, узнать о наличии свободных мест или получить консультацию и напоминания прямо в мессенджере, где уже общаетесь с друзьями или коллегами. Также это может увеличить охват и улучшить доступность, так как многие люди проводят много времени в соцсетях.",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Запустить личный какбинет",
                  web_app: {
                    url: "https://planz-up-sample.vercel.app/" + param_string,
                  },
                },
              ], // web_app - так указывается ссылка на мини приложение
            ],
          },
        }
      );
    } else if (text === "/link") {
      try {
        await bot.sendMessage(
          chatId,
          "Под этим сообщением появится кнопка, по ней можно зайти в личный кабинет",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Запустить личный какбинет",
                    login_url: {
                      url:
                        "https://ff30-5-79-244-189.ngrok-free.app/api/auth/telegram",
                      

                    },
                    web_app: {
                      url: "https://planz-up-sample.vercel.app/" + param_string,
                    },
                  },
                ], // web_app - так указывается ссылка на мини приложение
              ],
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      bot.sendMessage(chatId, "Неизвестная команда");
    }
  });
  bot.on("pollying_error", (err) => console.error(err.date.error.message));
  bot.on("polling_error", console.error);
  bot.on("web_app_data", (data) => {
    console.log(data.web_app_data.data);
  });

  return bot;
};
