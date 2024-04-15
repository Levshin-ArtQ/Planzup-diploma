module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
      'services',
      {
        // Здесь определяются атрибуты модели
        UID:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.FLOAT
        },
        
      }
  );
  return Service;
}