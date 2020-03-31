module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      text: DataTypes.TEXT,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Post.associate = function(models) {
    // the associate function gets evaluated inside of our index.js file
    // belongsTo function tells Sequelize that every Post belongs to exactly one user
    // then sequelize gives a new function on th Post model called getUser
    Post.belongsTo(models.User);
  };
  return Post;
};
