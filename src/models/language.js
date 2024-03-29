'use strict';

function Language(sequelize, DataTypes) {
  const fields = {
    shortName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING
  };

  const LanguageModel = sequelize.define('Language', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        LanguageModel.hasMany(models.User, {foreignKey: 'languageId'});
        LanguageModel.hasMany(models.Tree, {foreignKey: 'languageId'});
      }
    }
  });

  return LanguageModel;
}

module.exports = Language;