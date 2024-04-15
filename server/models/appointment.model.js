

module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define('appointments', {
    UID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
  },
  firstName: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  })
}

// TODO: 