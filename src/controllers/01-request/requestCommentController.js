const RequestCommentService = require('../../services/01-reuest/requestCommentService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestComment= async (req, res) => {
    /*
    #swagger.description = "새로운 의뢰글 댓글 추가"
    #swagger.tags = ['RequestComment - 의뢰글 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_idx": 1,
            "comment": "이거 혹시 야간까지 연장되면 야간 수당주시나요?"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/RequestComment`);
        const RequestComment = await RequestCommentService.createRequestComment(req.body);
        res.status(201).json(RequestComment);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/RequestComment 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestComments = async (req, res) => {
    /*
    #swagger.description = "의뢰글 댓글 전체 조회"
    #swagger.tags = ['RequestComment - 의뢰글 댓글 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/RequestComment/all`);
        const RequestComment = await RequestCommentService.getAllRequestComments();
        res.json(RequestComment);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/RequestComment/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getRequestCommentsByIDX = async (req, res) => {
    /*
    #swagger.description = "특정 댓글 조회"
    #swagger.tags = ['RequestComment - 의뢰글 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/RequestComment`);
        const RequestComment = await RequestCommentService.getRequestCommentsByIDX(req.body.request_idx);
        res.json(RequestComment);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/RequestComment 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}


exports.updateRequestComment = async (req, res) => {
    /*
    #swagger.description = "의뢰글 댓글 정보 갱신"
    #swagger.tags = ['RequestComment - 의뢰글 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "comment_idx": 1,
            "user_idx": 1,
            "request_idx": 1,
            "comment": "수정할 내용을 넣어주세요."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/RequestComment/update`);
        const RequestComment = await RequestCommentService.updateRequestComment(req.body);
        res.json(RequestComment);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/RequestComment/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.deleteRequestComment = async (req, res) => {
    /*
    #swagger.description = "의뢰글 댓글 정보 삭제"
    #swagger.tags = ['RequestComment - 의뢰글 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "comment_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/RequestComment/delete`);
        const RequestComment = await RequestCommentService.deleteRequestComment(req.body.comment_idx);
        res.json(RequestComment);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/RequestComment/delete 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}