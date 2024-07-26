const RequestApplicant = require('@src/models/RequestApplicant');
const sequelize = require('@src/config/database');

exports.createRequestApplicant = async (Data) => {
    return RequestApplicant.create(Data);
}

exports.getAllRequestApplicants = async () => {
    return await RequestApplicant.findAll();
}

exports.updateRequestApplicant = async (Data) => {

    return await RequestApplicant.update({
        request_idx: Data.request_idx,
        applicant_idx: Data.applicant_idx,
        applicant_state: Data.applicant_state,
        is_canceled: Data.is_canceled
    }, {
        where: {
            request_idx: Data.request_idx
        }
    });
}