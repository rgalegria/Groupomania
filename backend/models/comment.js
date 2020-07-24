var db = require('.');
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    var Comment =  sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.User, 
                key: 'id' },
            allowNull: true
        },
        redditId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.Reddit, 
                key: 'id' },
            allowNull: true
        }
    });
    Comment.associate = (models) => {
    Comment.hasMany(models.Reaction, { foreignKey: 'commentId', sourceKey: 'id' }),
    Comment.belongsTo(models.Reddit, { foreignKey: 'redditId', sourceKey:'id' }),
    Comment.belongsTo(models.Gag, { foreignKey: 'gagId', sourceKey:'id'})
};
    return Comment
}