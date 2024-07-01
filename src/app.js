const express = require('express');
const bodyParser = require('body-parser');
const routes = require('@src/routes');
const sequelize = require('@src/config/database');

const app = express();

app.use(bodyParser.json());

// set up routes
app.use('/api', routes);

// Authenticate the database connection
sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;