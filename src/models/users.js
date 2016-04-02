'use strict';

function User(sequelize, DataTypes) {
  const fields = {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    facebookId: DataTypes.STRING
  };

  const UserModel = sequelize.define('User', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        UserModel.belongsTo(models.Language);
        UserModel.hasMany(models.Tree);
      }
    }
  });


  return UserModel;
}

module.exports = User;