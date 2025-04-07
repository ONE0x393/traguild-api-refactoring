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
        type: DataTypes.STRING(24),
        allowNull: false
    },
    user_pw: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    user_region:{
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ""
    },
    user_email: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    user_nickname:{
        type: DataTypes.STRING(12),
        allowNull: true
    },
    user_img: {
        type: DataTypes.STRING(200),
        defaultValue: "",
    },
    user_credit:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
    },
    user_birth: {
        type: DataTypes.DATE,
    },
    user_rate: { //유저 평판
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 50.0
    },
    user_like: { //유저 좋아요
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    user_dislike: { //유저 싫어요
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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