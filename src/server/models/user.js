module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      avatar: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // the has many means the exact opposite of belongs to. Every user can have multiple posts
    User.hasMany(models.Post);
  };
  return User;
};
