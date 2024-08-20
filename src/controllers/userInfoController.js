const userInfoService = require('../services/userInfoService');
const {request} = require("express");
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createUser = async (req, res) => {
    /*
    #swagger.description = "유저 정보 생성"
    #swagger.tags = ['userInfo - 유저 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            user_id: "gdhong",
            user_pw: "mypassword",
            user_name: "홍길동",
            user_email: "gdhong@gmail.com",
            user_birth: "1900-01-01"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/userInfo`);
        const user = await userInfoService.createUser(req.body);
        res.status(201).json(user);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/userInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllUsers = async (req, res) => {
    /*
    #swagger.description = "유저 정보 전체 조회"
    #swagger.tags = ['userInfo - 유저 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/userInfo/all`);
        const users = await userInfoService.getAllUsers();
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/userInfo/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getUser = async (req, res) => {
    /*
    #swagger.description = "유저 정보 조회"
    #swagger.tags = ['userInfo - 유저 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: '유저 정보',
        required: true,
        schema: {
            user_idx: 1,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/userInfo`);
        const users = await userInfoService.getUser(req.body.user_idx);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/userInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateUser = async (req, res) => {
    /*
    #swagger.description = "유저 정보 갱신"
    #swagger.tags = ['userInfo - 유저 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        description: '유저 정보',
        required: true,
        schema: {
            "user_idx": 1,
            "user_pw": "chPw",
            "user_emaill": "chmail@gmail.com",
            "user_birth": "1932-04-03",
            "user_rate": 73,
            "is_agree_privacy": true,
            "last_login_time": "2024-07-26 14:44:27"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/userInfo/update`);
        const users = await userInfoService.updateUser(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/userInfo/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}