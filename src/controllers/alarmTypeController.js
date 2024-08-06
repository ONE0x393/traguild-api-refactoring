const alarmTypeService = require('@src/services/alarmTypeService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createAlarmType= async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/alarmType`);
        const alarmtype = await alarmTypeService.createAlarmType(req.body);
        res.status(201).json(alarmtype);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/alarmType 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllAlarmTypes = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/alarmType/all`);
        const alarmtype = await alarmTypeService.getAllAlarmTypes();
        res.json(alarmtype);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/alarmType/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateAlarmType = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/alarmType/update`);
        const alarmtype = await alarmTypeService.updateAlarmType(req.body);
        res.json(alarmtype);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/alarmType/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}