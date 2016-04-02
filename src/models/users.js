'use strict';

function User(sequelize, DataTypes) {
  const fields = {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    languageId: DataTypes.INTEGER
  };

  const UserModel = sequelize.define('User', fields, {
    paranoid: true,
    associate: (models) => {
      UserModel.belongsTo(models.Language, {foreignKey: 'languageId', as: 'preferredLanguage'});
      UserModel.hasMany(models.Tree, {foreignKey: 'userId', as: 'user'});
    }
  });


  return UserModel;
}

module.exports = User;