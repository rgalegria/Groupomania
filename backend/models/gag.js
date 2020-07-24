var db = require("../models");
const { Sequelize } = require('sequelize')

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gag = sequelize.define('Gag', {
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
        model: db.user, 
        key: 'id' },
    allowNull: false
    },  
});
  Gag.associate = (models) => {
    Gag.hasMany(models.Comment, { foreignKey: 'gagId', sourceKey: 'id' }),
    Gag.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' }),
    Gag.hasMany(models.Reaction, { foreignKey: 'gagId', sourcekey:'id'})
};
  return Gag;
};