module.exports = (sequelize, DataTypes) => {
  // the define function here creates the model
  // first param is the name
  // second is the field config

  // a post object has the id, text and user properties.
  // the user is a separate model and so we only need to configure id and text and columns of a post.
  // the is is automatically created by MySQl and so we don't need to specify it when running model:generate

  // the sequelize cli created a model file, exporting a function that after execution, returns a real database model.
  const Post = sequelize.define(
    "Post",
    {
      text: DataTypes.TEXT
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
