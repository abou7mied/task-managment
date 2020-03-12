const inversify = require('inversify');
const {TYPES} = require('../src/common');
const UsersModel = require('../models/user');
const ProjectsModel = require('../models/project');
const TasksModel = require('../models/task');

class Database {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  sync() {
    const models = [
      UsersModel,
      ProjectsModel,
      TasksModel,
    ];
    models.forEach(model => model.init(this.sequelize));
    return this.sequelize.sync();
  }

  findUsers(filters) {
    const options = {};
    if (filters) {
      options.where = filters;
    }
    return UsersModel.findAndCountAll(options);
  }

  findProjects(filters) {
    const options = {};
    if (filters) {
      options.where = filters;
    }
    return ProjectsModel.findAndCountAll(options);
  }

  findTasks(filters) {
    const options = {};
    if (filters) {
      options.where = filters;
    }
    return TasksModel.findAndCountAll(options);
  }

  createUser({name, email, surname}) {
    return UsersModel.create({
      name,
      email,
      surname,
    });
  }

  createProject({name, body, status}) {
    return ProjectsModel.create({
      name,
      body,
      status,
    });
  }

  createTask({name, description, score, status}) {
    return TasksModel.create({
      name,
      description,
      score,
      status,
    });
  }

}

inversify.decorate(inversify.injectable(), Database);
inversify.decorate(inversify.inject(TYPES.Sequelize), Database, 0);

module.exports = Database;
