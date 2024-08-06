const keywordService = require('@src/services/keywordService');
const logger = require('@src/config/winston/logger');
const requestIp = require('request-ip');

exports.createKeyword = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/keyWord`);
        const keyword = await keywordService.createKeyword(req.body);
        res.status(201).json(keyword);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/keyWord 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllKeywords = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/keyWord`);
        const keywords = await keywordService.getAllKeywords();
        res.json(keywords);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/keyWord 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateKeyword = async (req, res) => {
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/keyWord`);
        const keywords = await keywordService.updateKeyword(req.body);
        res.json(keywords);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/keyWord 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}