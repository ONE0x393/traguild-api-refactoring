const userTitleService = require('../../services/00-userInfo/userTitleService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createUserTitle = async (req, res) => {
    /*
    #swagger.description = "새로운 사용자 칭호 추가"
    #swagger.tags = ['userTitle - 사용자 칭호 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_level": 1,
            "user_title": "비기너"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/userTitle`);
        const user = await userTitleService.createUserTitle(req.body);
        res.status(201).json(user);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/userTitle 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getUserTitles = async (req, res) => {
    /*
    #swagger.description = "새로운 사용자 칭호 조회"
    #swagger.tags = ['userTitle - 사용자 칭호 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_level": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/userTitle`);
        const titles = await userTitleService.getUserTitles(req.body);
        res.json(titles);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/userTitle 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
exports.updateUserTitle = async (req, res) => {
    /*
    #swagger.description = "새로운 사용자 칭호 조회"
    #swagger.tags = ['userTitle - 사용자 칭호 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_level": 1,
            "user_title": "비기너"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} UPDATE /api/userTitle`);
        const users = await userTitleService.updateUserTitle(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} UPDATE /api/userTitle 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}