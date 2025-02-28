const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const ChatList = sequelize.define('TB_CHAT_LIST', {
    chat_list_idx:{  //채팅 참여 현황 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_idx: {  //채팅에 참여한 유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_room_idx: {  //유저가 참여한 채팅방의 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    out_room_check: {  //유저가 채팅방에 있는지 여부(방을 나갔는가?)
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatList;