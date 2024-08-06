const reportService = require('@src/services/reportService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createReport = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/report`);
        const resData = await reportService.createReport(req.body);
        res.status(201).json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/report 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllReports = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/report`);
        const resData = await reportService.getAllReports();
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/report 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
exports.getReportsByUser = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/report`);
        const resData = await reportService.getReportsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/report 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}