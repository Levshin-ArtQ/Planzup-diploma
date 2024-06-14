const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {

  const Settings = sequelize.define(
    "settings",
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
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
        defaultValue: "client",
        allowNull: false,
      },
      shardingSchedule: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
        beforeCreate: function (settings, options) {
          if (!settings?.dataValues?.password) {
            console.log('password is empty in ' + settings?.dataValues?.name);
            // reject if password is empty
            Promise.reject('password is empty in ' + settings?.dataValues?.name);
          } else {
            settings.dataValues.password = bcrypt.hashSync(settings.dataValues.password, 10);
          }
        
        },
        // the same as beforeCreate but with beforeBulkCreate
        beforeBulkCreate: async (settings) => {
          for (let i = 0; i < settings.length; i++) {
            if (!settings[i]?.dataValues?.password) {
              console.log('password is empty in ' + settings[i]?.dataValues?.name);
              // reject if password is empty
              Promise.reject('password is empty in ' + settings[i]?.dataValues?.name);
            } else {
              settings[i].dataValues.password = bcrypt.hashSync(settings[i].dataValues.password, 10);
            }
          }
        },
        beforeSave: async (settings) => {
          if (settings.changed("password")) {
            settings.dataValues.password = bcrypt.hashSync(settings.dataValues.password, 10);
          }
        },
      },
    }
  );
  return Settings;
};
