// create a sequelize model client inherited from user model additional attributes: reservations, occupation, address and phone number, loyalty points, favorite masters, etc
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "clients",
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
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
      email: {
        type: DataTypes.STRING,
      },
      telegram: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING, // TODO: add hashing here, allowNull: false,
      },
      address: {
        // type: DataTypes.GEOMETRY,
        type: DataTypes.STRING,
        // https://sequelize.org/api/v6/class/src/data-types.js~geometry
      },
      loyaltyPoints: {
        type: DataTypes.INTEGER,
      },
      favoriteMasters: {
        type: DataTypes.STRING,
      },
      favoriteServices: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scope: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    }
  );
  return Client;
};
