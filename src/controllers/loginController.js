const LoginService = require('../services/LoginService');
const {request} = require("express");
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.getLogin = async (req, res) => {
    /*
    #swagger.description = "로그인 조회"
    #swagger.tags = ['Login - 로그인']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            user_id: "gdhong",
            user_pw: "mypassword"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/login`);
        const users = await LoginService.getLogin(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/login 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}