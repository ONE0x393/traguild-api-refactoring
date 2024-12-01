const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const CommunityComment = sequelize.define('TB_COMMUNITY_COMMENT', {
    cmt_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_idx: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cmt_detail: {
        type: DataTypes.STRING(500),
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

module.exports = CommunityComment;