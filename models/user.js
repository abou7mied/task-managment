const {Model, DataTypes} = require('sequelize');

class User extends Model {

  static init(sequelize) {
    return super.init({
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
    }, {sequelize, modelName: 'user'})
  }

}

module.exports = User;
