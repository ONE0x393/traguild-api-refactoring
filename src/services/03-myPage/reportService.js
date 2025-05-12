const Report = require('../../models/03-myPage/Report');
const sequelize = require('../../config/database');
const RequestInfo = require("@src/models/01-request/RequestInfo");
const esClient = require("@src/config/esClient");

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

exports.getAllReportsHistory = async (data) => {
    const limit = data.limit;
    const safePage = parseInt(data.page, 10);
    const currentPage = isNaN(safePage) || safePage < 1 ? 1 : safePage;
    const offset = (currentPage - 1) * limit;

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
                JOIN TB_USER_INFO reporter ON r.report_user_idx = reporter.user_idx
                JOIN TB_USER_INFO reported ON r.reported_user_idx = reported.user_idx
                JOIN TB_REQUEST_INFO req ON r.reported_request_idx = req.request_idx
        ORDER BY
            r.is_complete ASC,
            r.created_time DESC
        LIMIT :limit OFFSET :offset
    `;

    const results = await sequelize.query(query, {
        replacements: { limit, offset },
        type: sequelize.QueryTypes.SELECT
    });
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

exports.updateReport = async (data) => {
    await Report.update({
        report_user_idx: data.report_user_idx,
        reported_request_idx: data.reported_request_idx,
        reported_user_idx: data.reported_user_idx,
        report_type: data.report_type,
        is_complete: data.is_complete,
        created_time: data.created_time,
    }, {
        where: {
            report_user_idx: data.report_user_idx,
            reported_request_idx: data.reported_request_idx
        }
    });
    return data;
};