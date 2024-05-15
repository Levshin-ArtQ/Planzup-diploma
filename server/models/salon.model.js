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
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slogan: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },


        
      }
  );
  return Salon;
}


