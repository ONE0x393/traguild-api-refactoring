const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const UserRelation = sequelize.define('TB_USER_RELATION', {
    user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    follower_idx: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = UserRelation;