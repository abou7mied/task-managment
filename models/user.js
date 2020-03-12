const {Model, DataTypes} = require('sequelize');

class User extends Model {

  static init(sequelize) {
    return super.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {sequelize, modelName: 'user'})
  }

}

module.exports = User;
