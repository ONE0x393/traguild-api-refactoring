const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const AlarmType = sequelize.define('TB_ALARM_TYPE', {
    recevier_user_idx:{  //수신자 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sender_user_idx:{  //송신자 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alarm_type: {  //알람종류
        type: DataTypes.STRING(50),
        allowNull: false
    },
    request_idx: { //의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = AlarmType;