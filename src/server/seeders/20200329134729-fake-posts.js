module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Posts",
      [
        {
          text: "Lorem ipsum 1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: "Lorem ipsum 2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Posts", null, {})
};
