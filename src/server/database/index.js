import Sequelize from "sequelize";

//  pass the db name as the first parameter
// then username and password for local dev user
// then a bunch of standard config, inlcudintthe host.
// generally it is a good idea to not use operator Aliases to avoid SQL injections.
// the pool options tells sequelize the connection config for every db connection
// this tell sequelize it should not mantain any connections but require a new one every time it is needed.
// idle specifies how long a connection will be mantained if it is not used.
const sequelize = new Sequelize("graphbook_dev", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
