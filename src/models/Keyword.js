const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const Keyword = sequelize.define('TB_KEYWORD', {
    keyword_user_idx:{  //유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    keyword_detail: {  //키워드 내용
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Keyword;