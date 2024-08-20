require('module-alias/register');
const logger = require("@src/config/winston/logger");
const initialize = require('@src/models/config/initialize');
const esClient = require('@src/config/esClient');
const app = require('@src/app');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({path: envFile});

const PORT = process.env.PORT || 3000;

// Initialize the database and then start the server
initialize().then(async () => {
    // 서버 시작
    app.listen(PORT, "0.0.0.0", () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    logger.error('Error initializing database:', err);
});