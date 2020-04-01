module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Chat.associate = function(models) {
    // The through property tells Sequelize that the two models are related via the users_chats table
    Chat.belongsToMany(models.User, { through: "users_chats" });
  };
  return Chat;
};
