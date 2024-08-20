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
        applicant_idx: data.applicant_idx,
        applicant_state: data.applicant_state,
        is_canceled: data.is_canceled
    }, {
        where: {
            request_idx: data.request_idx
        }
    });
}