// TODO: EDIT FIELDS
module.exports = (sequelize, DataTypes) => {
  const Master = sequelize.define(
    "masters",
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
      address: {
        // type: DataTypes.GEOMETRY,
        type: DataTypes.STRING,
        // https://sequelize.org/api/v6/class/src/data-types.js~geometry
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
    } 
  );
  return Master;
}
