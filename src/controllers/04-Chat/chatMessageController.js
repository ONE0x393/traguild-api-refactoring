const chatMessageService = require('../../services/04-Chat/chatMessageService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createChatMessage= async (req, res) => {
    /*
    #swagger.description = "새로운 채팅 추가"
    #swagger.tags = ['chatMessage - 채팅 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "chat_room_idx": 1,
            "chat_detail": "안녕하세요. 구인글 보고 연락드립니다^^.",
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/chatMessage`);
        const chatMessage = await chatMessageService.createChatMessage(req.body);
        res.status(201).json(chatMessage);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/chatMessage 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllChatMessages = async (req, res) => {
    /*
    #swagger.description = "채팅 전체 조회"
    #swagger.tags = ['chatMessage - 채팅 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatMessage/all`);
        const chatMessage = await chatMessageService.getAllChatMessages();
        res.json(chatMessage);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatMessage/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatMessageByIdx = async (req, res) => {
    /*
    #swagger.description = "특정 사용자의 채팅 조회"
    #swagger.tags = ['chatMessage - 채팅 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatMessage`);
        const chatMessage = await chatMessageService.getChatMessageByIdx(req.body.user_idx);
        res.json(chatMessage);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatMessage 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatMessageByRoom = async (req, res) => {
    /*
    #swagger.description = "특정 채팅방의 채팅 조회"
    #swagger.tags = ['chatMessage - 채팅 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatMessage/room`);
        const chatMessage = await chatMessageService.getChatMessageByRoom(req.body.chat_room_idx);
        res.json(chatMessage);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatMessage/room 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateChatMessage = async (req, res) => {
    /*
    #swagger.description = "채팅 정보 갱신"
    #swagger.tags = ['chatMessage - 채팅 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_idx": 1,
            "user_idx": 1,
            "chat_room_idx": 1,
            "chat_detail": "안녕하세요. 구인글 보고 연락드립니다^^.",
            "chat_check": true,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatMessage/update`);
        const chatMessage = await chatMessageService.updateChatMessage(req.body);
        res.json(chatMessage);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatMessage/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
