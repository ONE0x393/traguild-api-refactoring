const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const CreditHistory = sequelize.define('TB_CREDIT_HISTORY', {
    credit_trade_idx:{  //credit 거래 내역 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_idx: {  //의뢰공고 유저 고유 KEY(고용자)
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_idx: {  //credit 거래가 발생한 의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modify_credit: {  //거래한 Credit 양
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    modify_type:{ // 거래한 Credit이 Minus(사용): false  /  Plus(생산): true 로 설정
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    credit_from:{ //0일경우 어디에 사용되었는지, 충전일 경우 credit이 어디서 들어왔는지 출처
        type: DataTypes.STRING(20),
    },
    trade_time: {  //Credit 거래 시간
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_time: {  //수정 시간
        type: DataTypes.DATE,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = CreditHistory;