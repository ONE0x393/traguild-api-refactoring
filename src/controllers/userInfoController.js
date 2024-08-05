const userInfoService = require('@src/services/userInfoService');
const {request} = require("express");
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createUser = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} GET /api/userInfo/`);
        const user = await userInfoService.createUser(req.body);
        res.status(201).json(user);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} GET /api/userInfo/ 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userInfoService.getAllUsers();
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getUser = async (req, res) => {
    try{
        const users = await userInfoService.getUser(req.body.user_idx);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const users = await userInfoService.updateUser(req.body);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}