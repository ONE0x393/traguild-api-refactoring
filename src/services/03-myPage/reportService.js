const Report = require('../../models/03-myPage/Report');
const sequelize = require('../../config/database');

exports.createReport = async (reportData) => {
    return Report.create(reportData);
}

exports.getAllReports = async () => {
    return await Report.findAll();
}

exports.getReportsByUser = async (user_idx) => {
    return Report.findAll({
        where: {
            reported_user_idx: user_idx
        }
    });
}

exports.getAllReportsHistory = async () => {
    const query = `
        SELECT
            r.report_user_idx,
            reporter.user_nickname AS report_user_nickname,
            r.reported_request_idx,
            req.request_title AS reported_request_title,
            r.reported_user_idx,
            reported.user_nickname AS reported_user_nickname,
            r.report_type,
            r.is_complete,
            r.created_time
        FROM
            TB_REPORT r
                JOIN
            TB_USER_INFO reporter
            ON r.report_user_idx = reporter.user_idx
                JOIN
            TB_USER_INFO reported
            ON r.reported_user_idx = reported.user_idx
                JOIN
            TB_REQUEST_INFO req
            ON r.reported_request_idx = req.request_idx
    `;
    const [results, metadata] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return results;
}

exports.checkReportAlreadyByUser = async (data) => {
    const reports = await Report.findAll({
        where: {
            report_user_idx: data.report_user_idx,
            reported_request_idx: data.reported_request_idx
        }
    });

    if (reports.length > 0) {
        return false;  //이미 존재하여 신고가 접수되지 않으면 false
    } else {
        Report.create(data);
        return true; //신고에 성공하면 true
    }
}