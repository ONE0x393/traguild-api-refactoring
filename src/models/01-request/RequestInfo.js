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
    request_img:{ //의뢰 관련 이미지
        type: DataTypes.STRING(200),
        defaultValue: "",
    },
    request_content: {  //의뢰 내용
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
    },
    request_cost: {  //의뢰 비용
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    request_state: {  //의뢰 상태
        type: DataTypes.STRING(5),
        defaultValue: "모집", //기본은 모집
    },
    request_category: {  //의뢰 카테고리
        type: DataTypes.STRING(50),
    },
    created_date: {  //등록날짜
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_time: {
        type: DataTypes.DATE,
        allowNull: false,
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