const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const UserInfo = sequelize.define('TB_USER_INFO', {
    user_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(26),
        allowNull: false
    },
    user_pw: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_region:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_nickname:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_credit:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
    },
    user_birth: {
        type: DataTypes.DATE,
    },
    user_rate: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 50
    },
    is_agree_privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
    last_login_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = UserInfo;