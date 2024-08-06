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

            logger.info('Initial data inserted');
        }
    } catch(e){
        logger.error(`models/initialize.js => ${e.message}`);
    }
};

module.exports = initialize;