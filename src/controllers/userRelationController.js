const userRelationService = require('../services/userRelationService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createUserRelation = async (req, res) => {
    /*
    #swagger.description = "새로운 사용자 관계 추가"
    #swagger.tags = ['userRelation - 사용자 관계 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "follower_idx": 2
        }
    }
    */
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
    /*
    #swagger.description = "새로운 사용자 관계 조회"
    #swagger.tags = ['userRelation - 사용자 관계 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
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
    /*
    #swagger.description = "새로운 사용자 관계 조회"
    #swagger.tags = ['userRelation - 사용자 관계 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "follower_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} DELETE /api/userRelation`);
        const users = await userRelationService.deleteUserRelations(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} DELETE /api/userRelation 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}