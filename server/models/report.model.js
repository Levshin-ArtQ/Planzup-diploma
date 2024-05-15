module.exports = (sequelize, DataTypes) => {

  const Report = sequelize.define(
    'reports',
    {
      // Здесь определяются атрибуты модели
      UID:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      },
      time: {
        type: DataTypes.TIME
      },
      graph: {
        type: DataTypes.JSON
      },
    } 
  );
  return Report;
}