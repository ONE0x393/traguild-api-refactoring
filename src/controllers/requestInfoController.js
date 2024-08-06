const requestInfoService = require('@src/services/requestInfoService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestInfo= async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestInfo`);
        const requestInfo = await requestInfoService.createRequestInfo(req.body);
        res.status(201).json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestInfos = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo`);
        const requestInfo = await requestInfoService.getAllRequestInfos();
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getRequestInfoByIdx = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo`);
        const requestInfo = await requestInfoService.getRequestInfoByIdx(req.body.request_idx);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestInfo = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo`);
        const requestInfo = await requestInfoService.updateRequestInfo(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}