const ChatRoom = require('@src/models/04-Chat/ChatRoom');
const esClient = require('@src/config/esClient');

const insertChatRoom = async () => {
    const rooms = await ChatRoom.bulkCreate([
        {
            "chat_room_idx": 1,
            "chat_room_name": "한화 모집 공고",
            "last_chat_user_idx": 2,
            "chat_num": 4,
        },
        {
            "chat_room_idx": 2,
            "chat_room_name": "아이스크림 품평 동호회",
            "last_chat_user_idx": 1,
            "chat_num": 2,
        },
    ]);
    for(const room of rooms){
        await esClient.index({
            index: 'chat_room',
            id: room.chat_room_idx,
            body: room
        });
    }
    return rooms;
}

module.exports = insertChatRoom;