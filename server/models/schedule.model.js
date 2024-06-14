//  Модель расписания
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedules", {
    UID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    type : {
      type: Sequelize.ENUM('master', 'client')
    },
    description: {
      type: Sequelize.STRING
    },
  });

  return Schedule;
};