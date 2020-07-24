var db = require('../models');
const { Sequelize } = require('sequelize')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reddit = sequelize.define('Reddit', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: { 
          model: db.User, 
          key: 'id' },
      allowNull: false
    },  
  });
  Reddit.associate = (models) => {
    Reddit.hasMany(models.Comment, { foreignKey: 'commentId', sourceKey: 'id' }),
    Reddit.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' }),
    Reddit.hasMany(models.Reaction, { foreignKey: 'reactionId', sourceKey: 'id' })
};
  return Reddit;
}