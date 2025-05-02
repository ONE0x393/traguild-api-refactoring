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