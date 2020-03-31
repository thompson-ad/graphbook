module.exports = {
  // we first use the query interface to add the userId column to the posts table
  // we then add a foreign key contraint with the add constraint function
  // then constraint represents the relationship between both the user and the post entities
  // the relationship is saved in the userID column of the post table
  // running promise.all ensure that all promises in the array are resolved
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn("Posts", "userId", {
        type: Sequelize.INTEGER
      }),
      // this receives the foreign key string as a type
      // this says that the data type is the same as the corresponding column in the user table
      // then we specify the references field fir the userId column. Sequelize requires a table which is the users table and the field that our foreign key relates to which is the if column of the user table
      queryInterface.addConstraint("Posts", ["userId"], {
        type: "foreign key",
        name: "fk_user_id",
        references: {
          table: "Users",
          field: "id"
        },
        // cascade means that when a user is deleted or has their userId updated, the change is reflected in the users posts
        onDelete: "cascade",
        onUpdate: "cascade"
      })
    ]),

  down: (queryInterface, Sequelize) =>
    Promise.all([queryInterface.removeColumn("Posts", "userId")])
};
