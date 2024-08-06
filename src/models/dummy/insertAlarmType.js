const AlarmType = require('@src/models/AlarmType');

const insertAlarmType = async () => {
    return AlarmType.bulkCreate([
        {
            "receiver_user_idx": "1",
            "sender_user_idx": "2",
            "alarm_type": "채팅알림",
            "request_idx": "1"
        },{
            "receiver_user_idx": "2",
            "sender_user_idx": "3",
            "alarm_type": "채팅알림",
            "request_idx": "2"
        },{
            "receiver_user_idx": "3",
            "sender_user_idx": "4",
            "alarm_type": "요청수락",
            "request_idx": "3"
        },{
            "receiver_user_idx": "4",
            "sender_user_idx": "5",
            "alarm_type": "요청거절",
            "request_idx": "4"
        },{
            "receiver_user_idx": "5",
            "sender_user_idx": "1",
            "alarm_type": "개인요청",
            "request_idx": "5"
        },
    ]);
}

module.exports = insertAlarmType;