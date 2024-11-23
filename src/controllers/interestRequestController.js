const interestRequestService = require('../services/interestRequestService');
const requestInfoService = require('../services/requestInfoService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createInterestRequest= async (req, res) => {
    /*
    #swagger.description = "새로운 관심 의뢰 정보 추가"
    #swagger.tags = ['interestRequest - 관심 의뢰 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_idx": 35
        }
    }
    */
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
    /*
    #swagger.description = "관심 의뢰 정보 전체 조회"
    #swagger.tags = ['interestRequest - 관심 의뢰 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/interestRequest/all`);
        const InterestRequest = await interestRequestService.getAllInterestRequests();
        res.json(InterestRequest);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/interestRequest/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getFetchInterestRequestsByUser = async (req, res) => {
    /*
   #swagger.description = "관심 의뢰 정보 전체 조회"
   #swagger.tags = ['interestRequest - 관심 의뢰 테이블']
   */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/interestRequest/allByUser`);
        //특정 유저의 관심 의뢰 정보 가져오기
        const interestRequests = await interestRequestService.getInterestRequestByUser(req.body.user_idx);
        if (!interestRequests.length) {
            return res.status(404).json({ message: "No interest requests found for this user" });
        }

        const requestIdxList = interestRequests.map(item => item.request_idx); //관심있는 request_idx 배열화

        //배열을 넘겨받아 한꺼번에 처리
        const Results = await requestInfoService.getRequestInfosByIdxList(requestIdxList, req.body);

        res.json(Results);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/interestRequest/allByUser 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateInterestRequest = async (req, res) => {
    /*
    #swagger.description = "관심 의뢰 정보 갱신"
    #swagger.tags = ['interestRequest - 관심 의뢰 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_idx": 25
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/interestRequest/update`);
        const InterestRequest = await interestRequestService.updateInterestRequest(req.body);
        res.json(InterestRequest);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/interestRequest/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}