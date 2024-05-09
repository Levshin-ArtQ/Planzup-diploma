const {Sequelize, DataTypes} = require('sequelize');
const db = require('../util/database');
// create a sequelize model client inherited from user model additional attributes: reservations, occupation, address and phone number, loyalty points, favorite masters, etc
const Client = db.define('clients', {
    // inherit from user model
    UID:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    occupation: {
        type: DataTypes.STRING
    },
    address : {
        type: DataTypes.GEOMETRY('POINT')
        // https://sequelize.org/api/v6/class/src/data-types.js~geometry
    },
    loyaltyPoints: {
        type: DataTypes.INTEGER
    },
    favoriteMasters: {
        type: DataTypes.STRING
    },
    favoriteServices: {
        type: DataTypes.STRING
    },

}, {
    // Делает неполное удаление, добавляя deletedAt
    paranoid: true,

})

