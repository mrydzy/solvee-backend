'use strict';

function Tree(sequelize, DataTypes) {
  const fields = {
    data: DataTypes.JSONB,
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    lang: DataTypes.STRING
  };

  const TreeModel = sequelize.define('Tree', fields, {
    paranoid: true,
    associate: () => {
      TreeModel.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
      TreeModel.belongsTo(models.Language, {foreignKey: 'languageId', as: 'lang'});
    }
    //classMethods: {}
  });

  return TreeModel;
}

module.exports = Tree;