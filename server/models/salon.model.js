module.exports = (sequelize, DataTypes) => {
  const Salon = sequelize.define(
      'salons',
      {
        // Здесь определяются атрибуты модели
        UID:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        main_image: { type: DataTypes.STRING },
        images: { type: DataTypes.ARRAY(DataTypes.STRING),},
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slogan: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING, },
        address: { type: DataTypes.STRING },
        latitude: { type: DataTypes.FLOAT },
        longitude: { type: DataTypes.FLOAT },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        website: { type: DataTypes.STRING },
        telegram: { type: DataTypes.STRING },
        vk: { type: DataTypes.STRING },
        master_count: { type: DataTypes.INTEGER },
        client_count: { type: DataTypes.INTEGER },
      },
      { paranoid: true, }
  );
  return Salon;
}




        // Делает неполное удаление, добавляя deletedAt
        // убираем пароль в ответе от бд по умолчанию
        // defaultScope: {
        //   attributes: { exclude: ["password"] },
        // },
        // // пароль доступен только внутри .scope('withPassword')
        // scope: {
        //   withPassword: {
        //     attributes: { include: ["password"] },
        //   },
        // },


 // Salon.associate = async (models) => {
  //   await Salon.belongsToMany(models.Appointment, {
  //     through: "salon_appointments",



  //     foreignKey: "salonId",
  //     as: "appointments",
  //   });

  //   Salon.belongsToMany(models.Master, {
  //     through: "salon_masters",
  //     foreignKey: "salonId",
  //     as: "masters",
  //   });
  //   Salon.belongsToMany(models.Service, {
  //     through: "salon_services",
  //     foreignKey: "salonId",
  //     as: "services",
  //   });
  //   Salon.belongsToMany(model.Manager, {
  //     through: "salon_managers",
  //     foreignKey: "salonId",
  //     as: "managers",
  //   })
  //   Salon.belongsToMany(models.Admin, {
  //     through: "salon_admins",
  //     foreignKey: "salonId",
  //     as: "admins",
  //   });
  //   Salon.belongsToMany(models.ClientBase, {
  //     through: "salon_clients",
  //     foreignKey: "salonId",
  //     as: "clients",  
  //   });
  // };


