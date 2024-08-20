const communityPostService = require('../services/communityPostService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createCommunityPost = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 새로운 게시글 추가"
    #swagger.tags = ['communityPost - 커뮤니티 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "post_name": "게시글 제목",
            "user_idx": 1,
            "post_detail": "이것은 게시글 내용입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/communityPost`);
        const resData = await communityPostService.createCommunityPost(req.body);
        res.status(201).json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/communityPost 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllCommunityPosts = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 모든 게시글 조회"
    #swagger.tags = ['communityPost - 커뮤니티 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityPost/all`);
        const resData = await communityPostService.getAllCommunityPosts();
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityPost/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
exports.getCommunityPostsByUser = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 특정 사용자 게시글 조회"
    #swagger.tags = ['communityPost - 커뮤니티 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityPost`);
        const resData = await communityPostService.getCommunityPostsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityPost 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateCommunityPost = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 기존 게시글 갱신"
    #swagger.tags = ['communityPost - 커뮤니티 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "post_idx": 1,
            "post_name": "게시글 제목 (수정)",
            "post_detail": "수정된 게시글 내용입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityPost/update`);
        const resData = await communityPostService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityPost/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}