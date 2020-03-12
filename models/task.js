const {Model, DataTypes} = require('sequelize');

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
        type: DataTypes.ENUM('active', 'inactive', 'declined', 'completed'),
        allowNull: false,
      },
    }, {sequelize, modelName: 'task'})
  }

}

module.exports = Task;
