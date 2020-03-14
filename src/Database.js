const inversify = require('inversify');
const {Op} = require('sequelize');
const {TYPES} = require('../src/common');
const modelsFactory = require('../models');

function getFilterByClause(filters) {
  const {
    assignerName,
    assignerSurname,
    assigneeId,
    assigneeName,
    assigneeSurname,
  } = filters;
  const filterBy = {
    assigner: {},
    assignee: {},
  };
  if (assignerName) {
    filterBy.assigner.name = assignerName;
  }
  if (assignerSurname) {
    filterBy.assigner.surname = assignerSurname;
  }
  if (assigneeId) {
    filterBy.assignee.id = assigneeId;
  }
  if (assigneeName) {
    filterBy.assignee.name = assigneeName;
  }
  if (assigneeSurname) {
    filterBy.assignee.surname = assigneeSurname;
  }
  return filterBy;
}

class Database {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = modelsFactory(sequelize);
  }

  connect() {
    return this.sequelize.sync();
  }

  close() {
    return this.sequelize.close();
  }

  findUsers(filters) {
    const options = {where: {}};
    if (filters) {
      const {name, surname} = filters;
      if (name) {
        options.where.name = name;
      }
      if (surname) {
        options.where.surname = surname;
      }
    }
    return this.models.user.findAndCountAll(options);
  }

  findProjects(filters) {
    const options = {
      attributes: ['id', 'name', 'body', 'status', [this.sequelize.fn('min', this.sequelize.col('tasks.score')), 'averageScore']],
      where: {},
      include: [{
        attributes: [],
        model: this.models.task,
        required: false,
        where: {
          status: 'completed',
        }
      }],
      group: ['project.id'],
    };
    if (filters) {
      const {
        name,
        description,
        status,
        score,
      } = filters;
      if (name) {
        options.where.name = name;
      }
      if (description) {
        options.where.body = {
          [Op.like]: `%${description}%`,
        };
      }
      if (status) {
        options.where.status = status;
      }
      if (score) {
        options.where.score = {
          [Op.gte]: score,
        };
      }
      const {assignee: filterByAssignee, assigner: filterByAssigner} = getFilterByClause(filters);
      if (Object.keys(filterByAssigner).length) {
        options.include.push({
          model: this.models.user,
          where: filterByAssigner,
          attributes: [],
        });
      }
      if (Object.keys(filterByAssignee).length) {
        options.include.push({
            model: this.models.projectAssignees,
            required: true,
            include: [
              {
                model: this.models.user,
                where: filterByAssignee,
                attributes: [],
              }
            ],
          }
        );
        options.group.push('projectAssignees.projectId');
        options.group.push('projectAssignees.userId');
      }
    }
    return this.models.project.findAndCountAll(options);
  }

  findTasks(filters) {
    const options = {where: {}};
    const {
      name,
      description,
      status,
    } = filters;
    if (name) {
      options.where.name = name;
    }
    if (description) {
      options.where.description = {
        [Op.like]: `%${description}%`,
      };
    }
    if (status) {
      options.where.status = status;
    }
    const {assignee: filterByAssignee, assigner: filterByAssigner} = getFilterByClause(filters);
    if (Object.keys(filterByAssigner).length) {
      options.include = [{
        model: this.models.user,
        where: filterByAssigner,
        attributes: [],
      }];
    }
    if (Object.keys(filterByAssignee).length) {
      options.include = [
        {
          model: this.models.taskAssignees,
          required: true,
          include: [
            {
              model: this.models.user,
              where: filterByAssignee,
              attributes: [],
            }
          ],
        }
      ];
    }
    return this.models.task.findAndCountAll(options);
  }

  createUser({name, email, surname}) {
    return this.models.user.create({
      name,
      email,
      surname,
    });
  }

  createProject({name, body, status}) {
    return this.models.project.create({
      name,
      body,
      status,
    });
  }

  createTask({name, description, score, status}) {
    return this.models.task.create({
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
