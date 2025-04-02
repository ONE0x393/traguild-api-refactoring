const UserInfo = require('../../models/00-userInfo/UserInfo');
const sequelize = require('../../config/database');
const logger = require('@src/config/winston/logger');

exports.verifyCodeProc = async (data) => {
    try {
        const [rows] = await sequelize.query(`SELECT * FROM TB_USER_INFO WHERE user_id = ${data.user_id}`);
        if(rows.length == 0) return await UserInfo.create(data);
        else return rows[0];
    } catch (error) {
        logger.error(`Error during SingUp Process`)
    }
}

exports.siginUpProc = async (data) => {
    try {
        return await UserInfo.create(data)
    } catch (error) {
        logger.error(`Error during SingUp Process`)
    }
}