const { Client } = require('@elastic/elasticsearch');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({path: envFile});

const esAddress = process.env.ES_HOST || "localhost";
const esPort = process.env.ES_PORT || "9200";

const esClient = new Client({ node: 'http://' + esAddress + ':' + esPort});

module.exports = esClient;