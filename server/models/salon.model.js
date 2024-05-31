// const db = require('../util/database');
// const { Sequelize, DataTypes } = require('sequelize')

// здесь задается модель салона, она соединяет в себе все параметры салона, мастеров и клиентов
// TODO: EDIT FIELDS
module.exports = (sequelize, DataTypes) => {
  const Salon = sequelize.define(
      'salons',
      {
        // Здесь определяются атрибуты модели
        UID:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        main_image: {
          type: DataTypes.STRING
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slogan: {
          type: DataTypes.STRING
        },
        description: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING
        },
        latitude: {
          type: DataTypes.FLOAT
        },
        longitude: {
          type: DataTypes.FLOAT
        },
        phone: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        website: {
          type: DataTypes.STRING
        },
        instagram: {
          type: DataTypes.STRING
        },
        telegram: {
          type: DataTypes.STRING
        },
        facebook: {
          type: DataTypes.STRING
        },
        vk: {
          type: DataTypes.STRING
        },
        master_count: {
          type: DataTypes.INTEGER
        },
        client_count: {
          type: DataTypes.INTEGER
        },
      },
      {
        // Делает неполное удаление, добавляя deletedAt
        paranoid: true,
        // убираем пароль в ответе от бд по умолчанию
        defaultScope: {
          attributes: { exclude: ["password"] },
        },
        // пароль доступен только внутри .scope('withPassword')
        scope: {
          withPassword: {
            attributes: { include: ["password"] },
          },
        },
      }
  );
  return Salon;
}


