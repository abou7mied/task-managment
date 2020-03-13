const {projectStatuses} = require("../../src/common");

module.exports = {
  getTasks: {
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
    }
  },
  postTask: {
    properties: {
      name: {type: 'string', isNotEmpty: true},
      description: {type: 'string', isNotEmpty: true},
      status: {enum: projectStatuses},
      score: {type: 'number'},
    },
    required: ['name', 'description', 'status', 'score'],
  },
};
