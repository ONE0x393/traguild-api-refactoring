const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const InterestRequest = sequelize.define('TB_INTEREST_REQUEST', {
    user_idx:{  //유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_idx: {  //의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = InterestRequest;