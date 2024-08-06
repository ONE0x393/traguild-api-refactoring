const requestApplicantService = require('@src/services/requestApplicantService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestApplicant= async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestApplicant`);
        const RequestApplicant = await requestApplicantService.createRequestApplicant(req.body);
        res.status(201).json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestApplicant 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestApplicants = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all`);
        const RequestApplicant = await requestApplicantService.getAllRequestApplicants();
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestApplicant = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update`);
        const RequestApplicant = await requestApplicantService.updateRequestApplicant(req.body);
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}