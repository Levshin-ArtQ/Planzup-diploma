// const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define(
    "products",
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.BLOB,
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
    } 
  );
  return Product;
}