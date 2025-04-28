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

exports.checkReportAlreadyByUser = async (user_idx, request_idx) => {
    const reports = await Report.findAll({
        where: {
            reported_user_idx: user_idx,
            reported_request_idx: request_idx
        }
    });

    return reports.length > 0;  // 데이터가 존재하면 true, 없으면 false 반환
}