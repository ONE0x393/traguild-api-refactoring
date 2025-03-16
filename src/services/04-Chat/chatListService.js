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

exports.getAllChattingListByMine = async (user_idx) => {
    try {
        const result = await sequelize.query(
            `
                SELECT a.user_idx, a.chat_room_idx,b.user_nickname, m.chat_detail
                FROM TB_CHAT_LIST a
                         JOIN TB_USER_INFO b ON a.user_idx = b.user_idx
                         LEFT JOIN TB_CHAT_MESSAGE m
                                   ON a.chat_room_idx = m.chat_room_idx
                                       AND m.chat_idx = (
                                           SELECT MAX(chat_idx)
                                           FROM TB_CHAT_MESSAGE
                                           WHERE chat_room_idx = a.chat_room_idx
                                       )
                WHERE a.chat_room_idx IN (SELECT chat_room_idx FROM TB_CHAT_LIST WHERE user_idx = :user_idx)
                  AND a.user_idx != :user_idx
                ORDER BY m.send_time DESC;
            `,
            {
                replacements: {
                    user_idx,      // `:user_idx`에 값을 바인딩
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );

        return result;
    } catch (error) {
        console.error('Error fetching requestInfos by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
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
