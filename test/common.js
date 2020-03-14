require('dotenv').config();
process.env.POSTGRES_URL = process.env.POSTGRES_TEST_URL;

const supertest = require('supertest');
const {container} = require('../inversify.config');
const {TYPES} = require('../src/common');
const appFactory = require('../app');

const app = appFactory(container).listen(0);
const request = supertest(app);
const database = container.get(TYPES.Database);
const sequelize = container.get(TYPES.Sequelize);

module.exports = {
  container,
  sequelize,
  database,
  request,
};
