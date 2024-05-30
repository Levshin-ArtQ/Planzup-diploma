// create a sequelize model client inherited from user model additional attributes: reservations, occupation, address and phone number, loyalty points, favorite masters, etc
module.exports = (sequelize, DataTypes) => {
  const ClientBase = sequelize.define(
    "clientbases",
    {
      // inherit from user model
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        // TODO: add hashing here, allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.INTEGER,
      },
      telegram: {
        type: DataTypes.STRING,
      },
      favoriteServices: {
        type: DataTypes.STRING,
      },
    },
    {
      // Делает неполное удаление, добавляя deletedAt
      paranoid: true,
    }
  );
  return ClientBase;
};
