const userRelationService = require('@src/services/userRelationService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createUserRelation = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/userRelation`);
        const user = await userRelationService.createUserRelation(req.body);
        res.status(201).json(user);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/userRelation 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getUserRelations = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/userRelation`);
        const users = await userRelationService.getUserRelations(req.body.user_idx);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/userRelation 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
exports.deleteUserRelations = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} DELETE /api/userRelation`);
        const users = await userRelationService.deleteUserRelations(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} DELETE /api/userRelation 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}