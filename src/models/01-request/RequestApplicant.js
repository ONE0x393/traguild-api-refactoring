const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const RequestApplicant = sequelize.define('TB_REQUEST_APPLICANT', {
    request_idx:{  //의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_idx: {  //지원자 유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicant_state: {  //지원상태 - 기본은 "대기",  승인/반려/취소로 3가지 상태
        type: DataTypes.STRING(5),
        defaultValue: "대기",
        validate: {
            isIn: {
                args: [["대기", "승인", "반려", "취소"]], // 허용되는 값을 "승인/반려/취소"로 제한
                msg: "applicant_state must be one of: 대기, 승인, 반려, 취소",
            },
        },
    },
    applicant_intro: { //지원자 자기 소개?
        type: DataTypes.STRING(200),
        defaultValue: "",
        allowNull: false
    },
    is_canceled: { //지원 취소 여부
        type: DataTypes.BOOLEAN,
        defaultValue:0
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = RequestApplicant;