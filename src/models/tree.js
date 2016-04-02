'use strict';

function Tree(sequelize, DataTypes) {
  const fields = {
    data: DataTypes.JSONB,
    name: DataTypes.STRING
  };

  const TreeModel = sequelize.define('Tree', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        TreeModel.belongsTo(models.User, {as: 'facebook', foreignKey: 'facebookId'});
        TreeModel.belongsTo(models.Language, {as: 'language', foreignKey: 'languageId'});
      }
    }
  });

  return TreeModel;
}

module.exports = Tree;