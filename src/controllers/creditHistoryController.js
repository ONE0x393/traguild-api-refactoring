const creditHistoryService = require('../services/creditHistoryService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createCreditHistory= async (req, res) => {
    /*
    #swagger.description = "새로운 credit 거래 내역 추가"
    #swagger.tags = ['creditHistory - credit 거래 내역 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_idx": 3,
            "modify_credit": 120,
            "modify_type":false,
            "credit_from": "글 작성",
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/creditHistory`);
        const requestInfo = await creditHistoryService.createCreditHistory(req.body);
        res.status(201).json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/creditHistory 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllCreditHistory = async (req, res) => {
    /*
    #swagger.description = "새로운 credit 거래 내역 추가"
    #swagger.tags = ['creditHistory - credit 거래 내역 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/creditHistory/all`);
        const requestInfo = await creditHistoryService.getAllCreditHistory();
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/creditHistory/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getCreditHistoryByIdx = async (req, res) => {
    /*
    #swagger.description = "새로운 credit 거래 내역 추가"
    #swagger.tags = ['creditHistory - credit 거래 내역 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "credit_trade_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/creditHistory`);
        const requestInfo = await creditHistoryService.getCreditHistoryByIdx(req.body.credit_trade_idx);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/creditHistory 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateCreditHistory = async (req, res) => {
    /*
    #swagger.description = "새로운 credit 거래 내역 추가"
    #swagger.tags = ['creditHistory - credit 거래 내역 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "credit_trade_idx": 1,
            "user_idx": 1,
            "request_idx": 3,
            "modify_credit": 2500,
            "modify_type":false,
            "credit_from": "글 작성",
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/creditHistory/update`);
        const requestInfo = await creditHistoryService.updateCreditHistory(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/creditHistory/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}