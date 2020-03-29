import Sequelize from "sequelize";
import configFile from "../config";
// We use the NODE_ENV environment variable to get the environment that the server is running in.
// we read the config file and pass the correct configuration to the sequelize instance.
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.port,
  config
);

const db = {
  sequelize
};

// the instance is then exported for use in out app in a special db object
export default db;
