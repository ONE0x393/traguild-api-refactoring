const {DataTypes} = require('sequelize');
const sequelize = require('@src/config/database');

const Report = sequelize.define('Report', {
    report_idx:{  //신고글 고유 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    report_user_idx: {  //신고자 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reported_user_idx: {  //피신고자 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    report_type: {  //신고종류
        type: DataTypes.STRING,
        allowNull: false
    },
    created_time: { //신고시간
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = Report;