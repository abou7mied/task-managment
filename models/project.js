const {Model, DataTypes} = require('sequelize');
const {projectStatuses} = require("../src/common");

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
        type: DataTypes.ENUM(...projectStatuses),
        allowNull: false,
      },
    }, {sequelize, modelName: 'project'})
  }

}

module.exports = Project;
