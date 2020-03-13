const UsersModel = require('../models/user');
const ProjectsModel = require('../models/project');
const ProjectAssigneesModel = require('../models/projectAssignees');
const TaskAssigneesModel = require('../models/taskAssignees');
const TasksModel = require('../models/task');

function init(sequelize) {
  const models = [
    UsersModel,
    ProjectsModel,
    ProjectAssigneesModel,
    TaskAssigneesModel,
    TasksModel,
  ].map(model => model.init(sequelize));

  const [
    user,
    project,
    projectAssignees,
    taskAssignees,
    task,
  ] = models;
  project.belongsTo(user, {foreignKey: 'assignerId'});
  task.belongsTo(user, {foreignKey: 'assignerId'});
  task.belongsTo(project, {foreignKey: 'projectId'});
  project.hasMany(task);


  user.belongsToMany(project, {through: projectAssignees});
  project.belongsToMany(user, {through: projectAssignees});
  projectAssignees.belongsTo(user);
  projectAssignees.belongsTo(project);
  user.hasMany(projectAssignees);
  project.hasMany(projectAssignees);

  user.belongsToMany(task, {through: taskAssignees});
  task.belongsToMany(user, {through: taskAssignees});
  taskAssignees.belongsTo(user);
  taskAssignees.belongsTo(task);
  user.hasMany(taskAssignees);
  task.hasMany(taskAssignees);

  return {
    user,
    project,
    task,
    projectAssignees,
    taskAssignees,
  }
}

module.exports = init;
