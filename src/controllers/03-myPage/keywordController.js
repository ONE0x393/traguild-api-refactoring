const keywordService = require('../../services/03-myPage/keywordService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createKeyword = async (req, res) => {
    /*
    #swagger.description = "새로운 키워드 추가"
    #swagger.tags = ['keyword - 키워드 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "keyword_user_idx": 1,
            "keyword_detail": "설거지"
        }
    }
    */
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
    /*
    #swagger.description = "키워드 전체 조회"
    #swagger.tags = ['keyword - 키워드 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/keyWord/all`);
        const keywords = await keywordService.getAllKeywords();
        res.json(keywords);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/keyWord/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateKeyword = async (req, res) => {
    /*
    #swagger.description = "키워드 갱신"
    #swagger.tags = ['keyword - 키워드 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "keyword_user_idx": 1,
            "keyword_detail": "공구리"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/keyWord/update`);
        const keywords = await keywordService.updateKeyword(req.body);
        res.json(keywords);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/keyWord/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}