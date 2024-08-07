const sequelize = require('@src/config/database');
const logger = require('@src/config/winston/logger');
const process = require("process");

const initialize = async () => {
    await sequelize.sync({force: true});
    try{
        if(process.env.NODE_ENV != "prod") {
            logger.info('Database synchronized');

            // Insert UserInfo data
            const insertUserInfo = require('@src/models/dummy/insertUserInfo');
            await insertUserInfo();

            // Insert KeyWord data
            const insertKeyword = require('@src/models/dummy/insertKeyword');
            await insertKeyword();

            // Insert AlarmType data
            const insertAlarmType = require('@src/models/dummy/insertAlarmType');
            await insertAlarmType();

            // Insert InterestRequest data
            const insertInterestRequest = require('@src/models/dummy/insertInterestRequest');
            await insertInterestRequest();

            // Insert RequestInfo data
            const insertRequestInfo = require('@src/models/dummy/insertRequestInfo');
            await insertRequestInfo();

            // Insert RequestApplicant data
            const insertRequestApplicant = require('@src/models/dummy/insertRequestApplicant');
            await insertRequestApplicant();

            logger.info('Initial data inserted');
        }
    } catch(e){
        logger.error(`models/initialize.js => ${e.message}`);
    }
};

module.exports = initialize;