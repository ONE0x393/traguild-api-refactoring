const communityCommentService = require('../services/communityCommentService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createCommunityComment = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 게시글에 대한 새로운 댓글 추가"
    #swagger.tags = ['communityComment - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "post_idx": 1,
            "user_idx": 1,
            "cmt_detail": "댓글 내용 입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/communityComment`);
        const resData = await communityCommentService.createCommunityComment(req.body);
        res.status(201).json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/communityComment 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getCommunityCommentsByPost = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 게시글에 대한 댓글 조회"
    #swagger.tags = ['communityComment - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "post_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityComment/byPost`);
        const resData = await communityCommentService.getCommunityCommentsByPost(req.body.post_idx);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityComment/byPost 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getCommunityCommentsByUser = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 사용자에 대한 댓글 조회"
    #swagger.tags = ['communityComment - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityComment/byUser`);
        const resData = await communityCommentService.getCommunityCommentsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityComment/byUser 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateCommunityPost = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 댓글 정보 갱신"
    #swagger.tags = ['communityComment - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "cmt_idx": 1,
            "post_idx": 1,
            "user_idx": 1,
            "cmt_detail": "수정된 댓글입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityComment/update`);
        const resData = await communityCommentService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityComment/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}