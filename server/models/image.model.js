import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const imageModel = sequelize.define(
    'images',
    {
      UID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      where_from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { schema: 'imageSchema' },
  );
  return imageModel;
};
// TODO: look how to use it: https://stackoverflow.com/questions/47701640/saving-images-with-sequelize