const ChatRoomService = require('../../models/04-Chat/ChatRoom');
const sequelize = require('../../config/database');
const esClient = require('../../config/esClient');

exports.createChatRoom = async (data) => {
    const now = new Date();
    data.create_time = now.toISOString();
    const room = await ChatRoomService.create(data);

    await esClient.index({
        index: 'chat_room',
        id: room.chat_room_idx,
        body: room
    });

    return room;
}

exports.getAllChatRooms = async () => {
    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}


exports.getChatRoomByName = async (chat_room_name) => {
    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                match: { chat_room_name: chat_room_name } //텍스트 조건은 match로
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.getChatRoomByIdx = async (chat_room_idx) => {
    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                term: { chat_room_idx: chat_room_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.updateChatRoom = async (data) => {
    await ChatRoomService.update({
        chat_room_name: data.chat_room_name,
        last_chat_user_idx: data.last_chat_user_idx,
        chat_num: data.chat_num,
    }, {
        where: {
            chat_room_idx: data.chat_room_idx,
        }
    });
    await esClient.update({
        index: 'chat_room',
        id: data.chat_room_idx,
        body: {
            doc: data
        }
    });
    return data;
}
