const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 13306,
    dialect: 'mysql',
    dateStrings: 'date',
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
        timezone: "+09:00", // DB에서 가져올 때 시간 설정
    }
});

module.exports = sequelize;