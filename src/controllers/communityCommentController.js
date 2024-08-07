const communityCommentService = require('@src/services/communityCommentService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createCommunityComment = async (req, res) => {
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
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityComment/update`);
        const resData = await communityCommentService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityComment/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}