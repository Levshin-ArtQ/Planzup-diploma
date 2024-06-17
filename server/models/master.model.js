// TODO: EDIT FIELDS
module.exports = (sequelize, DataTypes) => {
  const Master = sequelize.define(
    "masters",
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT
      },
      phone: {
        type: DataTypes.STRING,
      },
      occupation: {
        type: DataTypes.STRING,
      },
      service_count: {
        type: DataTypes.INTEGER,
      },
      rights: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      address: {
        // type: DataTypes.GEOMETRY,
        type: DataTypes.STRING,
        // https://sequelize.org/api/v6/class/src/data-types.js~geometry
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
      // defaultScope: {
      //   attributes: { exclude: ["password"] },
      // },
      // scope: {
      //   withPassword: {
      //     attributes: { include: ["password"] },
      //   },
      // },
    } 
  );
  return Master;
}
