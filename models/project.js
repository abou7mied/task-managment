const {Model, DataTypes} = require('sequelize');

class Project extends Model {

 static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'declined', 'completed'),
        allowNull: false,
      },
    }, {sequelize, modelName: 'project'})
  }

}

module.exports = Project;
