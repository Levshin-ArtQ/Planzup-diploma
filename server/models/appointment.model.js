module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointments", {
    UID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.TIME,
    },
    service: {
      type: DataTypes.STRING,
    },
    master: {
      type: DataTypes.STRING,
    },
    client: {
      type: DataTypes.STRING,
    },
  });
};

// TODO:
