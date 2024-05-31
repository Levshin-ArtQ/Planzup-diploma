module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("posts", {
    UID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  }

  );
  return Post;
}