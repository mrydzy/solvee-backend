'use strict';

function Style(sequelize, DataTypes) {
  const fields = {
    name: DataTypes.STRING
  };

  const StyleModel = sequelize.define('Style', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        StyleModel.hasMany(models.Tree, {foreignKey: 'styleId'});
      }
    }
  });

  return StyleModel;
}

module.exports = Style;