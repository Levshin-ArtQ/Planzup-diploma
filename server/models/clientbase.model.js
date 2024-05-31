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
  return ClientBase;
};
