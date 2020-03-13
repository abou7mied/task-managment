const {projectStatuses} = require("../../src/common");

module.exports = {
  getProjects: {
    properties: {
      name: {type: 'string'},
      description: {type: 'string'},
      status: {enum: projectStatuses},
      score: {type: 'number'},
      assignerName: {type: 'string'},
      assignerSurname: {type: 'string'},
      assigneeId: {type: 'number'},
      assigneeName: {type: 'string'},
      assigneeSurname: {type: 'string'},
    },
  },
  postProject: {
    properties: {
      name: {type: 'string', isNotEmpty: true},
      body: {type: 'string', isNotEmpty: true},
      status: {enum: projectStatuses},
    },
    required: ['name', 'body', 'status']
  },
};
