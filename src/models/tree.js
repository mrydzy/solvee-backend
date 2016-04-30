'use strict';

function Tree(sequelize, DataTypes) {
  const fields = {
    data: DataTypes.JSONB,
    name: DataTypes.STRING,
    photoLink: DataTypes.STRING,
    child1: DataTypes.STRING,
    child2: DataTypes.STRING,
    child3: DataTypes.STRING
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