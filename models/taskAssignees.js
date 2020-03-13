const {Model, DataTypes} = require('sequelize');

class Project extends Model {

  static init(sequelize) {
    return super.init({
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {sequelize, modelName: 'taskAssignees'})
  }

}

module.exports = Project;
