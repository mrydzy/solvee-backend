'use strict';

function Tree(sequelize, DataTypes) {
  const fields = {
    data: DataTypes.JSONB,
    name: DataTypes.STRING,
    photoLink: DataTypes.String
  };

  const TreeModel = sequelize.define('Tree', fields, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        TreeModel.belongsTo(models.User, {foreignKey: 'userId'});
        TreeModel.belongsTo(models.Language, {foreignKey: 'languageId'});
      }
    }
  });

  return TreeModel;
}

module.exports = Tree;