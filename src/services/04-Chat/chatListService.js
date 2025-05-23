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
                SELECT a.user_idx AS host_user_idx, a.out_room_check AS host_out_room_check, subA.*
                FROM
                (SELECT tcl.*, ri.request_idx, ri.user_idx AS 'requested_user_idx', request_title, user_nickname, request_img, request_state,
                        applicant_idx, is_deleted, chat_idx, chat_detail, send_time
                FROM TB_CHAT_LIST tcl
                    JOIN TB_USER_INFO USING(user_idx)
                    JOIN TB_CHAT_ROOM USING(chat_room_idx)
                    JOIN TB_REQUEST_INFO ri USING(request_idx)
                    LEFT JOIN TB_CHAT_MESSAGE tcm
                    ON tcm.chat_room_idx = tcl.chat_room_idx
                    AND tcm.chat_idx = (
                        SELECT MAX(tmp.chat_idx)
                        FROM TB_CHAT_MESSAGE tmp
                        WHERE tmp.chat_room_idx = tcl.chat_room_idx
                    )
                WHERE tcl.chat_room_idx IN (
                    SELECT tmp.chat_room_idx
                    FROM TB_CHAT_LIST tmp
                    WHERE tmp.user_idx = :user_idx
                    AND tmp.out_room_check = 0
                )
                AND tcl.user_idx != :user_idx
                ) AS subA
                LEFT JOIN TB_CHAT_LIST a
                ON subA.chat_room_idx = a.chat_room_idx AND a.user_idx = :user_idx
                ORDER BY send_time DESC
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
