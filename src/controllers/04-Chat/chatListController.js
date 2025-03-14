const chatListService = require('../../services/04-Chat/chatListService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createChatList= async (req, res) => {
    /*
    #swagger.description = "새로운 채팅현황 추가"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "chat_room_idx": 1,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/chatList`);
        const chatList = await chatListService.createChatList(req.body);
        res.status(201).json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/chatList 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllChatLists = async (req, res) => {
    /*
    #swagger.description = "채팅현황 전체 조회"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatList/all`);
        const chatList = await chatListService.getAllChatLists();
        res.json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatList/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatListByIdx = async (req, res) => {
    /*
    #swagger.description = "특정 사용자의 채팅현황 조회"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatList`);
        const chatList = await chatListService.getChatListByUser(req.body.user_idx);
        res.json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatList 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatListByRoom = async (req, res) => {
    /*
    #swagger.description = "특정 채팅방의 채팅현황 조회"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatList/room`);
        const chatList = await chatListService.getChatListByRoom(req.body.chat_room_idx);
        res.json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatList/room 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getAllChattingListByMine = async (req, res) => {
    /*
    #swagger.description = "특정 채팅방의 채팅현황 조회"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatList/room`);
        const chatList = await chatListService.getAllChattingListByMine(req.body.user_idx);
        res.json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatList/room 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateChatList = async (req, res) => {
    /*
    #swagger.description = "채팅현황 정보 갱신"
    #swagger.tags = ['chatList - 채팅현황 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_list_idx": 1,
            "user_idx": 1,
            "chat_room_idx": 1,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatList/update`);
        const chatList = await chatListService.updateChatList(req.body);
        res.json(chatList);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatList/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
