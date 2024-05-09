const TelegramBot = require('node-telegram-bot-api');
const botConfig = require('./config/bot.config');
const bot = require('./telegram_object')(TelegramBot, botConfig.token);