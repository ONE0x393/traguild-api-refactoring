const RequestInfo = require('@src/models/RequestInfo');
const sequelize = require('@src/config/database');

exports.createRequestInfo = async (Data) => {
    return RequestInfo.create(Data);
}

exports.getAllRequestInfos = async () => {
    return await RequestInfo.findAll();
}

exports.getRequestInfo = async (request_idx) => {
    return RequestInfo.findByPk(request_idx);
}

exports.updateRequestInfo = async (Data) => {

    return await RequestInfo.update({
        request_idx: Data.request_idx,
        user_idx: Data.user_idx,
        request_region: Data.request_region,
        request_title: Data.request_title,
        request_content: Data.request_content,
        request_cost: Data.request_cost,
        request_state: Data.request_state,
        transaction_state: Data.transaction_state,
        created_date: Data.created_date,
        is_deleted: Data.is_deleted,
        applicant_idx: Data.applicant_idx
    }, {
        where: {
            request_idx: Data.request_idx
        }
    });
}