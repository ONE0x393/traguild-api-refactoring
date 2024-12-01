const AuthService = require('../../services/auth/AuthService');
const userInfoService = require('../../services/00-userInfo/userInfoService');
const {request} = require("express");
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');
const bcrypt = require("bcrypt");

exports.siginUpProc = async (req, res) => {
    /*
    #swagger.description = "회원가입 프로세스"
    #swagger.tags = ['Auth - 인증 관련 API']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            user_name: "홍길동",
            user_region: "서울특별시 강서구",
            user_nickname: "서성한에서성서성",
            user_email: "gdhong@gmail.com",
            user_pw: "gdseoul123123@"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/auth/signUp`);
        const salt = bcrypt.genSaltSync(10);

        const body = req.body;
        body.user_id = body.user_email;
        body.user_pw = bcrypt.hashSync(body.user_pw, salt)

        const users = await AuthService.siginUpProc(req.body);
        res.json(users);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/auth/signIn 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.signInProc = async (req, res) => {
    /*
    #swagger.description = "로그인 프로세스"
    #swagger.tags = ['Auth - 인증 관련 API']
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
        logger.info(`${requestIp.getClientIp(req)} POST /api/auth/signIn`);
        const body = req.body;

        const {user_pw, user_idx} = await userInfoService.getUserInfoById(body.user_id);
        const isValid = await bcrypt.compare(body.user_pw, user_pw);
        
        if(isValid) res.json({"user_idx": user_idx});
        else {
            logger.info(`${requestIp.getClientIp(req)} POST /api/auth/signIn ERROR: Login Failed`);
            res.json({"user_idx": -1});
        }
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/auth/signIn 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}