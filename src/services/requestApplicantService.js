const RequestApplicant = require('../models/RequestApplicant');
const sequelize = require('../config/database');

exports.createRequestApplicant = async (data) => {
    return RequestApplicant.create(data);
}

exports.getAllRequestApplicants = async () => {
    return await RequestApplicant.findAll();
}

exports.updateRequestApplicant = async (data) => {

    return await RequestApplicant.update({
        request_idx: data.request_idx,
        user_idx: data.user_idx,
        applicant_state: data.applicant_state,
        applicant_intro: data.applicant_intro,
        is_canceled: data.is_canceled
    }, {
        where: {
            request_idx: data.request_idx
        }
    });
}

exports.updateRequestAllApplicantForReject = async (request_idx, applicant_state) => {

    return await RequestApplicant.update({
        applicant_state: applicant_state,
    }, {
        where: {
            request_idx: request_idx
        }
    });
}