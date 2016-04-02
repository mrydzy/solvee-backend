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
        TreeModel.belongsTo(models.User);
        TreeModel.belongsTo(models.Language);
      }
    }
  });

  return TreeModel;
}

module.exports = Tree;