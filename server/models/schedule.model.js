// import DataTypes from "sequelize";
//  модель расписания
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedules", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true 
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Schedule;
};