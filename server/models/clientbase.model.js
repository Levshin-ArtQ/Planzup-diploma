module.exports = (sequelize, DataTypes) => {
  const ClientBase = sequelize.define(
    "clientbases",
    {
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
      paranoid: true,
    }
  );
  return ClientBase;
};
