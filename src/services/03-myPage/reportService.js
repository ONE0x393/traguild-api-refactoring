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
        return "이미 신고하였습니다.";  // 신고가 이미 존재하면 이 메시지를 반환
    } else {
        // 신고가 존재하지 않으면 createReport 함수를 호출
        Report.create(data);
        return "신고가 접수되었습니다."
    }
}