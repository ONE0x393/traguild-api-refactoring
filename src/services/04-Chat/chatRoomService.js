const ChatRoomService = require('../../models/04-Chat/ChatRoom');
const sequelize = require('../../config/database');
const esClient = require('../../config/esClient');
const getSynonymSearch = require('../../config/synonymSearch');

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
    const queryString = await getSynonymSearch(chat_room_name);

    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                bool: {
                    should: [
                        {
                            match: { chat_room_name: queryString } // 텍스트 조건은 match로
                        },
                        {
                            wildcard: {
                                chat_room_name: `*${chat_room_name}*` // wildcard 쿼리: 요청 제목에 검색어가 포함된 문서 찾기
                            }
                        }
                    ],
                    minimum_should_match: 1 // `should` 쿼리 중 하나라도 만족하면 결과에 포함
                }
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

exports.checkRoomExistByIdx = async (data) => {
    try {
        const result = await sequelize.query(
            `
                SELECT a.user_idx
                FROM TB_CHAT_LIST a
                WHERE a.chat_room_idx IN (SELECT chat_room_idx FROM TB_CHAT_LIST WHERE user_idx = :user_idx)
                  AND a.user_idx != :user_idx;
            `,
            {
                replacements: {
                    user_idx: data.user_idx, // data.user_idx 값 바인딩
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        // result 배열에서 data.other_idx와 같은 값이 있는지 확인
        const isExist = result.some(item => item.user_idx === data.other_idx);

        return isExist;
    } catch (error) {
        console.error('Error fetching requestInfos by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
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
