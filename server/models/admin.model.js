// TODO: edit fields
const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    "admins",
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      occupation: {
        type: DataTypes.STRING, 
      },
      rights: {
        type: DataTypes.STRING,
      },
      address: {
        // type: DataTypes.GEOMETRY("POINT"),
        type: DataTypes.STRING,
        // https://sequelize.org/api/v6/class/src/data-types.js~geometry
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
    } 
  );
  return Admin;
};
