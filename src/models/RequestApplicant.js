const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const RequestApplicant = sequelize.define('TB_REQUEST_APPLICANT', {
    request_idx:{  //의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicant_idx: {  //지원자 유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicant_state: {  //지원상태
        type: DataTypes.STRING(5)
    },
    is_canceled: { //지원 취소 여부
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = RequestApplicant;