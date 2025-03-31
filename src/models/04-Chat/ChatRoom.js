const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const ChatRoom = sequelize.define('TB_CHAT_ROOM', {
    chat_room_idx:{  //채팅방 고유 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    request_idx: {  //채팅방을 개설하게 된 의뢰 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_room_name: {  //채팅방 이름
        type: DataTypes.STRING(25),
        allowNull: false
    },
    last_chat_user_idx: {  //마지막 채팅 작성자
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    chat_num: {  //해당 채팅방의 채팅 개수
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    created_time: {  //채팅방 생성 시간
        type: DataTypes.DATE,
        //allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatRoom;