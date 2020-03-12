const {Model, DataTypes} = require('sequelize');

class Task extends Model {

  static init(sequelize) {
    return super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      score: DataTypes.INTEGER,
      status: DataTypes.ENUM('active', 'inactive', 'declined', 'completed'),
    }, {sequelize, modelName: 'task'})
  }

}

module.exports = Task;
