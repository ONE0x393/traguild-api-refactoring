const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const UserTitle = sequelize.define('TB_USER_TITLE', {
    user_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    user_title:{
        type: DataTypes.STRING(20),
        allowNull: false,
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = UserTitle;