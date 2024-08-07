const Report = require('@src/models/Report');

const insertReport = async () => {
    return Report.bulkCreate([
        {
            "report_user_idx": 1,
            "reported_user_idx": 2,
            "report_type": "비속어",
            "created_time": "2021-01-01 00:00:00",
        }, {
            "report_user_idx": 1,
            "reported_user_idx": 3,
            "report_type": "음란물 유포",
            "created_time": "2021-01-01 00:00:00",
        }, {
            "report_user_idx": 1,
            "reported_user_idx": 4,
            "report_type": "사기",
            "created_time": "2021-01-01 00:00:00",
        }, {
            "report_user_idx": 2,
            "reported_user_idx": 1,
            "report_type": "비속어",
            "created_time": "2021-01-01 00:00:00",
        }, {
            "report_user_idx": 4,
            "reported_user_idx": 1,
            "report_type": "사기",
            "created_time": "2021-01-01 00:00:00",
        },
    ]);
}

module.exports = insertReport;