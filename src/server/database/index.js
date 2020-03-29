import Sequelize from "sequelize";
import configFile from "../config";
import models from "../models";

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
  models: models(sequelize),
  sequelize
};

// the instance is then exported for use in out app in a special db object
export default db;
