const chatRoomService = require('../../services/04-Chat/chatRoomService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createChatRoom= async (req, res) => {
    /*
    #swagger.description = "새로운 채팅방 추가"
    #swagger.tags = ['chatRoom - 채팅방 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_name": "창원 한화 모집공고",
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/chatRoom`);
        const chatRoom = await chatRoomService.createChatRoom(req.body);
        res.status(201).json(chatRoom);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/chatRoom 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllChatRooms = async (req, res) => {
    /*
    #swagger.description = "채팅방 전체 조회"
    #swagger.tags = ['chatRoom - 채팅방 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatRoom/all`);
        const chatRoom = await chatRoomService.getAllChatRooms();
        res.json(chatRoom);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatRoom/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatRoomByIdx = async (req, res) => {
    /*
    #swagger.description = "특정 채팅방 조회"
    #swagger.tags = ['chatRoom - 채팅방 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatRoom`);
        const chatRoom = await chatRoomService.getChatRoomByIdx(req.body.chat_room_idx);
        res.json(chatRoom);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatRoom 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatRoomByName = async (req, res) => {
    /*
    #swagger.description = "특정 채팅방 이름으로 조회"
    #swagger.tags = ['chatRoom - 채팅방 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_name": "창원 한화 모집공고"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatRoom/name`);
        const chatRoom = await chatRoomService.getChatRoomByName(req.body.chat_room_name);
        res.json(chatRoom);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatRoom/name 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateChatRoom = async (req, res) => {
    /*
    #swagger.description = "채팅방 정보 갱신"
    #swagger.tags = ['chatRoom - 채팅방 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "chat_room_idx": 1,
            "chat_room_name": "모집종료. 많은 지원에 감사드립니다.",
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/chatRoom/update`);
        const chatRoom = await chatRoomService.updateChatRoom(req.body);
        res.json(chatRoom);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/chatRoom/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
