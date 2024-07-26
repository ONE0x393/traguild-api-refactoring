const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const RequestInfo = sequelize.define('TB_REQUEST_INFO', {
    request_idx:{  //의뢰 고유 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_idx: {  //의뢰 요청자= 유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_region: {  //지역 카테고리
        type: DataTypes.STRING(20),
        defaultValue:"자유"
    },
    request_title: {  //의뢰 제목
        type: DataTypes.STRING(20),
        allowNull: false
    },
    request_content: {  //의뢰 내용
        type: DataTypes.TEXT
    },
    request_cost: {  //의뢰 비용
        type: DataTypes.STRING(20),
        defaultValue:0
    },
    request_state: {  //의뢰 상태
        type: DataTypes.STRING(5)
    },
    transaction_state: {  //거래 상태
        type: DataTypes.STRING(5)
    },
    created_date: {  //등록날짜
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    },
    is_deleted: {  //삭제여부
        type: DataTypes.BOOLEAN,
        defaultValue:0
    },
    applicant_idx: {  //선정된 지원자 유저 고유 KEY
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = RequestInfo;