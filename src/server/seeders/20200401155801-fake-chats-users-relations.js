module.exports = {
  up: (queryInterface, Sequelize) => {
    // first we resolve all users and chats by promise.all
    // this ensures all of the chats ans users are available at the same time
    // to test the chat functionality we chose the first chat and the first two users returned from the database
    // take their ids and save them in the users_chats table
    const usersAndChats = Promise.all([
      queryInterface.sequelize.query("SELECT id from Users;"),
      queryInterface.sequelize.query("SELECT id from Chats;")
    ]);

    return usersAndChats.then(rows => {
      const users = rows[0][0];
      const chats = rows[1][0];

      return queryInterface.bulkInsert(
        "users_chats",
        [
          {
            userId: users[0].id,
            chatId: chats[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            userId: users[1].id,
            chatId: chats[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    });
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("users_chats", null, {})
};
