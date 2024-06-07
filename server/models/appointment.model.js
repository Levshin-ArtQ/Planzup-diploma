module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointments", {
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    UID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      alllowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },

    start: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    end: {
      type: DataTypes.DATE,
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
  
  return Appointment;
};

// TODO:
