'use strict';

function Tree(sequelize, DataTypes) {
  const fields = {
    name: DataTypes.STRING,
    data: DataTypes.JSONB,
    userId: DataTypes.STRING
  };

  const TreeModel = sequelize.define('Tree', fields, {
    paranoid: true,
    //classMethods: {}
  });

  return TreeModel;
}

module.exports = Tree;