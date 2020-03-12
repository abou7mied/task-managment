require('reflect-metadata');
const {Container} = require('inversify');
const {Sequelize} = require('sequelize');
const Database = require('./src/Database');
const {TYPES} = require('./src/common');

const container = new Container();
const sequelize = new Sequelize('sqlite::memory:');

container.bind(TYPES.Sequelize)
  .toConstantValue(sequelize);

container.bind(TYPES.Database)
  .to(Database)
  .inSingletonScope();

module.exports = {
  container,
};





