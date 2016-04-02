'use strict';

function Language(sequelize, DataTypes) {
  const fields = {
    shortName: DataTypes.STRING,
    name: DataTypes.STRING
  };

  const LanguageModel = sequelize.define('Language', fields, {
    paranoid: true,
    associate: () => {
      LanguageModel.hasMany(models.User, {foreignKey: 'languageId', as: 'lang'})
      LanguageModel.hasMany(models.Tree, {foreignKey: 'languageId', as: 'lang'})
    }
    //classMethods: {}
  });

  return LanguageModel;
}

module.exports = Language;