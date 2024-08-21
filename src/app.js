const express = require('express');
const logger = require("./config/winston/logger");
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const swaggerFile = require("./swagger-output");

const app = express();

app.use(bodyParser.json());
app.set('trust proxy', true);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// set up routes
app.use('/api', routes);

// Authenticate the database connection
sequelize.authenticate().then(() => {
    logger.info('Database connection has been established successfully.');
  }).catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = app;