module.exports = {
  getUsers: {
    properties: {
      name: {type: 'string'},
      surname: {type: 'string'},
    },
  },
  postUser: {
    properties: {
      name: {type: 'string', isNotEmpty: true},
      email: {format: 'email'},
      surname: {type: 'string', isNotEmpty: true},
    },
    required: ['name', 'email', 'surname'],
    additionalProperties: false,
  },
};
