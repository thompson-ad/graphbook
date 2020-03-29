module.exports = {
  up: (queryInterface, Sequelize) =>
    // by convention the model name is pluralised in migrations but it is singular inside of model definitions.
    // Table names are also pluralised
    // migrations have two properties:
    // up: what should be done when running the migration
    // down: what should be done when undoing a migration
    queryInterface.createTable("Posts", {
      // the id will automatically count upward for each post in our table
      // This uniquely identifies posts for us
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Posts")
};
