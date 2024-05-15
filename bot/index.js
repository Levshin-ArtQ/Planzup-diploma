const TelegramBot = require('node-telegram-bot-api');
const botConfig = require('./config/bot.config');
const bot = require('./telegram_object')(TelegramBot, botConfig.bot_token);

console.log('bot invoked');

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(
//     process.env.PGDATABASE,
//     process.env.PGUSER,
//     process.env.PGPASSWORD,
//     {
//         host: 'postgres', //better through to config and check why it is postgres and not localhost
//         dialect: 'postgres',
//         pool: {
//             max: config.pool.max,
//             min: config.pool.min,
//             acquire: config.pool.acquire,
//             idle: config.pool.idle
//         }
//     }
// );