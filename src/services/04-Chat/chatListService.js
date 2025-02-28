const ChatListService = require('../../models/04-Chat/ChatList');
const sequelize = require('../../config/database');
const esClient = require('../../config/esClient');

exports.createChatList = async (data) => {
    const list = await ChatListService.create(data);

    await esClient.index({
        index: 'chat_list',
        id: list.chat_list_idx,
        body: list
    });

    return list;
}

exports.getAllChatLists = async () => {
    const { body } = await esClient.search({
        index: 'chat_list',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}


exports.getChatListByUser = async (user_idx) => {
    const { body } = await esClient.search({
        index: 'chat_list',
        body: {
            query: {
                term: { user_idx: user_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.getChatListByRoom = async (chat_room_idx) => {
    const { body } = await esClient.search({
        index: 'chat_list',
        body: {
            query: {
                term: { chat_room_idx: chat_room_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.updateChatList = async (data) => {
    await ChatListService.update({
        user_idx: data.user_idx,
        chat_room_idx: data.chat_room_idx,
        out_room_check: data.out_room_check,
    }, {
        where: {
            chat_list_idx: data.chat_list_idx,
        }
    });
    await esClient.update({
        index: 'chat_list',
        id: data.chat_list_idx,
        body: {
            doc: data
        }
    });
    return data;
}
