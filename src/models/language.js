'use strict';

function Language(sequelize, DataTypes) {
  const fields = {
    shortName: DataTypes.STRING,
    name: DataTypes.STRING
  };

  const LanguageModel = sequelize.define('Language', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        LanguageModel.hasMany(models.User);
        LanguageModel.hasMany(models.Tree);
      }
    }
  });

  return LanguageModel;
}

module.exports = Language;