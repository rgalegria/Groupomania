var db = require(".")

module.exports = (sequelize, DataTypes) => {
    var Reaction =  sequelize.define('Reaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },redditId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.reddit,
                key: 'id' },
            allowNull: true,
        },gagId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.gag,
                key: 'id' },
            allowNull: true,
        },commentId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.comment,
                key: 'id' },
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                 model: db.user, 
                 key: 'id' },
            allowNull: true,
        },
    },
);
    Reaction.associate = (models) => {
    Reaction.belongsTo(models.Reddit, { foreignKey: 'redditId', sourceKey:'id' }),
    Reaction.belongsTo(models.Gag, { foreignKey: 'gagId', sourceKey:'id' }),
    Reaction.belongsTo(models.Comment, { foreignKey: 'commentId', sourceKey:'id' }),
    Reaction.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' })
    };
    return Reaction
}