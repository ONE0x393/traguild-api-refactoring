const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const RequestComment = sequelize.define('TB_REQUEST_COMMENT', {
    comment_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_idx: { //댓글을 다는 사용자 고유번호
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_idx: { // 댓글이 달린 의뢰글 고유번호
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: { // 댓글 내용 500자 제한
        type: DataTypes.STRING(500),
        allowNull: false
    },
    created_date: { //댓글 생성시간
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_date: { //댓글 수정시간
        type: DataTypes.DATE,
        allowNull: false
    },
    is_deleted: { //삭제여부
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = RequestComment;