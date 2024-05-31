module.exports = (sequelize, DataTypes) => { 

  const Notification = sequelize.define('notifications', {
    UID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    targetDate: {
      type: DataTypes.DATE
    },
    targetTime: {
      type: DataTypes.TIME
    },
    targetUsers: {
      type: DataTypes.ARRAY(DataTypes.STRING) //TODO: it should lower computation time
    },
    status: {
      type: DataTypes.ENUM('pending', 'done'),
      defaultValue: 'pending'
    },

  })

  return Notification;
} // TODO: export