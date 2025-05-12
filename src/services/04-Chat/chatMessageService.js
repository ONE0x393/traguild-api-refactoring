const ChatMessageService = require('../../models/04-Chat/ChatMessage');
const sequelize = require('../../config/database');
const esClient = require('../../config/esClient');

exports.createChatMessage = async (data) => {
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 적용

    data.send_time = koreaTime.toISOString();
    const chat = await ChatMessageService.create(data);

    await esClient.index({
        index: 'chat_message',
        id: chat.chat_idx,
        body: chat
    });

    return chat;
}

exports.getAllChatMessages = async () => {
    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}


exports.getChatMessageByIdx = async (user_idx) => {
    const { body: exists } = await esClient.indices.exists({ index: 'chat_message' });
    if (!exists) {
        return [];
    }
    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                term: { user_idx: user_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.getChatMessageByRoom = async (chat_room_idx) => {
    const { body: exists } = await esClient.indices.exists({ index: 'chat_message' });
    if (!exists) {
        return [];
    }

    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                term: { chat_room_idx: chat_room_idx }
            },
            size: 10000, // 최근 10000개만 가져오기
            sort: [
                { "chat_idx": { "order": "asc" } }  // Sorting by chat_idx in ascending order
            ],
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.updateChatMessage = async (data) => {
    await ChatMessageService.update({
        user_idx: data.user_idx,
        chat_room_idx: data.chat_room_idx,
        chat_detail: data.chat_detail,
    }, {
        where: {
            chat_idx: data.chat_idx,
        }
    });
    await esClient.update({
        index: 'chat_message',
        id: data.chat_idx,
        body: {
            doc: data
        }
    });
    return data;
}
