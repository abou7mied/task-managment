const {Model, DataTypes} = require('sequelize');

class Project extends Model {

 static init(sequelize) {
    return super.init({
      name: DataTypes.STRING,
      body: DataTypes.TEXT,
      status: DataTypes.ENUM('active', 'inactive', 'declined', 'completed'),
    }, {sequelize, modelName: 'project'})
  }

}

module.exports = Project;
