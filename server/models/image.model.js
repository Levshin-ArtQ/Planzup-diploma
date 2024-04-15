import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const imageModel = sequelize.define(
    'images',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      image: { 
        type: DataTypes.BLOB('long'), // <- type for image ( database :postgresql )
        allowNull: true 
      },
    },
    { schema: 'imageSchema' },
  );
  return imageModel;
};
// TODO: look how to use it: https://stackoverflow.com/questions/47701640/saving-images-with-sequelize