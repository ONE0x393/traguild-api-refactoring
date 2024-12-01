const UserInfo = require('../../models/00-userInfo/UserInfo');
const sequelize = require('../../config/database');
const logger = require('@src/config/winston/logger');

exports.siginUpProc = async (data) => {
    try {
        return await UserInfo.create(data)
    } catch (error) {
        logger.error(`Error during SingUp Process`)
    }
}