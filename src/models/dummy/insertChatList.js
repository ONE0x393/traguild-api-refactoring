const ChatList = require('@src/models/04-Chat/ChatList');
const esClient = require('@src/config/esClient');

const insertChatList = async () => {
    const lists = await ChatList.bulkCreate([
        {
            "user_idx": 1,
            "chat_room_idx": 1,
            "out_room_check": false,
        },
        {
            "user_idx": 2,
            "chat_room_idx": 1,
            "out_room_check": false,
        },
        {
            "user_idx": 3,
            "chat_room_idx": 2,
            "out_room_check": false,
        },
        {
            "user_idx": 1,
            "chat_room_idx": 2,
            "out_room_check": false,
        },
    ]);
    for(const list of lists){
        await esClient.index({
            index: 'chat_list',
            id: list.chat_list_idx,
            body: list
        });
    }
    return lists;
}

module.exports = insertChatList;