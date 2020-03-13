const {Model, DataTypes} = require('sequelize');
const {taskStatuses} = require("../src/common");

class Task extends Model {

  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...taskStatuses),
        allowNull: false,
      },
    }, {sequelize, modelName: 'task'})
  }

}

module.exports = Task;
