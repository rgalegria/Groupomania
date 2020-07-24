const { Sequelize } = require('sequelize')

'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName : DataTypes.STRING,
        lastName : DataTypes.STRING,
        email : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password : {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        avatar : DataTypes.STRING,
        department : DataTypes.STRING,
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
  });
  User.associate = (models) => {
    // hasMany association: foreign key (userId) stored on target model (Text)
    User.hasMany(models.Reddit, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Gag, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Reaction, { foreignKey: 'userId', sourceKey: 'id' })
};
  return User;
};
