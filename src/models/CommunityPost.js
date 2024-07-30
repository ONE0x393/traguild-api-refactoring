const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const CommunityPost = sequelize.define('TB_COMMUNITY_POST', {
    post_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_detail: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = CommunityPost;