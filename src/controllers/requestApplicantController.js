const requestApplicantService = require('../services/requestApplicantService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestApplicant= async (req, res) => {
    /*
    #swagger.description = "새로운 의뢰 지원자 정보 추가"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "user_idx": 2,
            "applicant_state": "대기",
            "applicant_intro": "안녕하십니까"
        }
    }
    */
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
    /*
    #swagger.description = "의뢰 지원자 정보 전체 조회"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all`);
        const RequestApplicant = await requestApplicantService.getAllRequestApplicants();
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getFetchRequestInfosByUser = async (req, res) => {
    /*
    #swagger.description = "의뢰 지원자 정보 전체 조회"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/applyRequest`);
        const RequestApplicant = await requestApplicantService.getFetchRequestInfosByUser(req.body.user_idx, req.body);
        res.json(RequestApplicant.map(item => item.request_idx));
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/applyRequest 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestApplicant = async (req, res) => {
    /*
    #swagger.description = "의뢰 지원자 정보 갱신"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "user_idx": 2,
            "applicant_state": "대기",
            "applicant_intro": "한곡 뽑아보겠습니다!"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update`);
        const RequestApplicant = await requestApplicantService.updateRequestApplicant(req.body);
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestAllApplicantForReject = async (req, res) => {
    /*
    #swagger.description = "의뢰 지원자 정보 갱신"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/rejectAll`);
        const RequestApplicant = await requestApplicantService.updateRequestAllApplicantForReject(req.body.request_idx, req.body.applicant_state);
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/rejectAll 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}