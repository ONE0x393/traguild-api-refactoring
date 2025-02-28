const ChatMessage = require('@src/models/04-Chat/ChatMessage');
const esClient = require('@src/config/esClient');

const insertChatMessage = async () => {
    const messages = await ChatMessage.bulkCreate([
        {
            "user_idx": 1,
            "chat_room_idx": 1,
            "chat_detail": "공고보고 연락드립니다.",
        },
        {
            "user_idx": 2,
            "chat_room_idx": 1,
            "chat_detail": "네 안녕하세요.",
        },
        {
            "user_idx": 1,
            "chat_room_idx": 1,
            "chat_detail": "다음주 화요일 6시간이라고 하셨는데 언제 시작인가요?",
        },
        {
            "user_idx": 2,
            "chat_room_idx": 1,
            "chat_detail": "오전 10시에 시작합니다.",
        },
        {
            "user_idx": 3,
            "chat_room_idx": 2,
            "chat_detail": "아이스크림 맛있다.",
        },
        {
            "user_idx": 1,
            "chat_room_idx": 2,
            "chat_detail": "올때 메로나.",
        },
    ]);
    for(const message of messages){
        await esClient.index({
            index: 'chat_message',
            id: message.chat_idx,
            body: message
        });
    }
    return messages;
}

module.exports = insertChatMessage;