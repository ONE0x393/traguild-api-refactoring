const interestRequestService = require('@src/services/interestRequestService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createInterestRequest= async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/interestRequest`);
        const InterestRequest = await interestRequestService.createInterestRequest(req.body);
        res.status(201).json(InterestRequest);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/interestRequest 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllInterestRequests = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/interestRequest`);
        const InterestRequest = await interestRequestService.getAllInterestRequests();
        res.json(InterestRequest);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/interestRequest 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateInterestRequest = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/interestRequest`);
        const InterestRequest = await interestRequestService.updateInterestRequest(req.body);
        res.json(InterestRequest);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/interestRequest 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}