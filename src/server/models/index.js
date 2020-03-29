import Sequelize from "sequelize";

// we search for all files ending with .js in the same folder as this file
// and load them all with require.context
// in development we need to require context hook
// in production it is included in webpack
if (process.env.NODE_ENV === "development") {
  require("babel-plugin-require-context-hook/register")();
}

export default sequelize => {
  const db = {};

  const context = require.context(
    ".",
    true,
    /^\.\/(?!index\.js).*\.js$/,
    "sync"
  );
  context
    .keys()
    .map(context)
    .forEach(module => {
      // the loaded model file export a function with the following two parameters
      //  our sequelize instance, after creating a connection to our db
      //  the sequelize class itself including the dtat types it offers, such as integer or text.
      const model = module(sequelize, Sequelize);
      db[model.name] = model;
    });

  // when all models are imported, we loop through them and check whether they have an associate method and through that we establish relations between multiple models
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
