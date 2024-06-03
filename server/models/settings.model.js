const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {

  const Settings = sequelize.define(
    "settings",
    {
      // Здесь определяются атрибуты модели
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // async validPassword(password) { 
      //   return await bcrypt.compare(password, this.password);
      // },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      usertype: {
        type: DataTypes.ENUM("master", "client", "manager", "admin", "администратор", "менеджер", "мастер"),
      },
      push_token: {
        type: DataTypes.STRING,
      },
      prefers_telegram: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      prefers_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      prefers_push: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      prefers_: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
      hooks: {
        // beforeCreate: function (settings) {
        //    //whatever number you want
        //    console.log(settings.password);
        //   settings.password = bcrypt.hashSync(settings.password, 10);
        // },
        beforeSave: async (settings) => {
          if (settings.changed("password")) {
            settings.password = bcrypt.hashSync(settings.password, 10);
          }
        },
      },
    }
  );
  // Settings.prototipe.validPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };
  return Settings;
};
