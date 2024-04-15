//  модель расписания
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedules", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Schedule;
};