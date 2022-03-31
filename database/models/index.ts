import { Sequelize, Dialect } from 'sequelize';
import config from '../../config/database';

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect,
});

export { sequelize, Sequelize };
