const {request} = require("express");
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({path: envFile});
const ENV = process.env;

const paymentsService = require('../../services/pg/paymentsService');

exports.paymentsConfirm = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/v1/payments/confirm`);
        
        const confirmResponse = await paymentsService.paymentsConfirm(req.body);

        return res.json({data: confirmResponse});
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/v1/payments/confirm 500 ERROR: ${e.message}`);
        return res.status(500).json({message: e.message});
    }
}