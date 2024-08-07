const communityPostService = require('@src/services/communityPostService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createCommunityPost = async (req, res) => {
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
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/communityPost/update`);
        const resData = await communityPostService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/communityPost/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}