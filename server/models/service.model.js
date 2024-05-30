module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
      'services',
      {
        // Здесь определяются атрибуты модели
        UID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        main_image: {
          type: DataTypes.STRING
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
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