const alarmTypeService = require('../../services/03-myPage/alarmTypeService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createAlarmType= async (req, res) => {
    /*
    #swagger.description = "새로운 알림 정보 추가"
    #swagger.tags = ['alarm - 알림 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "receiver_user_idx": 1,
            "sender_user_idx": 2,
            "alarm_type": "의뢰수락",
            "request_idx": 35
        }
    }
   */
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
    /*
    #swagger.description = "알림 정보 전체 조회"
    #swagger.tags = ['alarm - 알림 정보 테이블']
   */
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
    /*
    #swagger.description = "알림 정보 갱신"
    #swagger.tags = ['alarm - 알림 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "receiver_user_idx": 1,
            "sender_user_idx": 2,
            "alarm_type": "채팅",
            "request_idx": 35
        }
    }
   */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/alarmType/update`);
        const alarmtype = await alarmTypeService.updateAlarmType(req.body);
        res.json(alarmtype);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/alarmType/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}