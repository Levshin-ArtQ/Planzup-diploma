const { Sequelize, DataTypes } = require('sequelize')
const db = require('../util/database');

// здесь задается модел, по сути, класс пользователя
const Reservation = db.define('reservation', {
        UID:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        // userId: DataTypes.STRING,
        userName: DataTypes.STRING,
        place: DataTypes.STRING,
        master: DataTypes.STRING,
        notify: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        // serviceId: DataTypes.STRING,
        serviceName: DataTypes.STRING,
        chosenDTime: DataTypes.DATE,
        tgChat: {
            type: DataTypes.STRING,
            defaultValue: 'notg',

        },
        note: DataTypes.STRING
    },
    {   
        // Делает неполное удаление, добавляя deletedAt
        paranoid: true,
    }
);

module.exports = Reservation;
// master, client, admin, service, reservation, schedule