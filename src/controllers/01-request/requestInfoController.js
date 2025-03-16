const requestInfoService = require('../../services/01-reuest/requestInfoService');
const requestApplicantService = require('../../services/01-reuest/requestApplicantService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestInfo= async (req, res) => {
    /*
    #swagger.description = "새로운 의뢰 정보 추가"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_region": "경상남도 창원시",
            "request_title": "공사장 야리끼리 3인 급구!",
            "request_content": "제목이랑 같습니다. 야리끼리로 하루 일하실 성인남성 3분 구합니다.",
            "request_cost": 20000,
            "request_state": "모집",
            "applicant_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestInfo`);
        const requestInfo = await requestInfoService.createRequestInfo(req.file, req.body);
        res.status(201).json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getRequestImage= async (req, res) => {
    /*
    #swagger.description = "의뢰 이미지 가져오기"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestInfo/getImage/${req.params.idx}`);
        const request_img = await requestInfoService.getRequestImage(req.params.idx);
        logger.info(request_img[0])
        res.sendFile(request_img[0], (err) => {
            if (err) {
                console.error("Error sending file:", err.message);
                if (!res.headersSent) {
                    res.status(404).json({ error: "File not found" });
                }
            }
        });
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestInfo/getImage/${req.params.idx} 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestInfos = async (req, res) => {
    /*
    #swagger.description = "의뢰 정보 전체 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/all`);
        const requestInfo = await requestInfoService.getAllRequestInfos();
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getFetchRequestInfos = async (req, res) => {
    /*
    #swagger.description = "의뢰 정보 limit건 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "page": 1,
            "limit": 10
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/fetch`);
        const requestInfo = await requestInfoService.getFetchRequestInfos(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/fetch 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getFetchRequestInfosByTitle = async (req, res) => {
    /*
    #swagger.description = "의뢰제목으로 의뢰 정보 limit건 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_title": "오전 중 창고정리",
            "page": 1,
            "limit": 10
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/title`);
        const requestInfo = await requestInfoService.getFetchRequestInfosByTitle(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/title 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getRequestInfoByIdx = async (req, res) => {
    /*
    #swagger.description = "특정 의뢰 정보 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo`);
        const requestInfo = await requestInfoService.getRequestInfoByIdx(req.body.request_idx);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getFecthApplicantOnlyMine = async (req, res) => {
    /*
    #swagger.description = "특정 사용자의 의뢰에 지원한 사람들 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "page": 1,
            "limit": 10
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/onlyMine`);

        //특정 유저가 등록한 모든 requestInfo를 가져온다.
        const users_requestInfo = await requestInfoService.getFetchRequestInfosOnlyMine(req.body);
        if(!users_requestInfo.length){
            return [];
            // return res.status(404).json({ message: "No requests found for by this user" });
        }

        res.json(users_requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/onlyMine 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestInfo = async (req, res) => {
    /*
    #swagger.description = "의뢰 정보 갱신"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "user_idx": 1,
            "request_region": "경상남도 창원시",
            "request_title": "공사장 야리끼리 1인 급구!",
            "request_content": "2분 지원완료 됬습니다. 마지막 1분 모집합니다",
            "request_cost": 25000,
            "request_state": "모집",
            "applicant_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/update`);
        const requestInfo = await requestInfoService.updateRequestInfo(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestImg = async (req, res) => {
    /*
    #swagger.description = "의뢰 이미지 갱신"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_img": "",
            "request_idx": 1,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/update`);
        const requestInfo = await requestInfoService.updateRequestImg(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}