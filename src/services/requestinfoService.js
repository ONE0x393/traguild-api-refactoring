const RequestInfo = require('@src/models/RequestInfo');
const sequelize = require('@src/config/database');

exports.createRequestInfo = async (data) => {
    return RequestInfo.create(data);
}

exports.getAllRequestInfos = async () => {
    return await RequestInfo.findAll();
}

exports.getRequestInfo = async (request_idx) => {
    return RequestInfo.findByPk(request_idx);
}

exports.updateRequestInfo = async (data) => {

    return await RequestInfo.update({
        request_idx: data.request_idx,
        user_idx: data.user_idx,
        request_region: data.request_region,
        request_title: data.request_title,
        request_content: data.request_content,
        request_cost: data.request_cost,
        request_state: data.request_state,
        transaction_state: data.transaction_state,
        created_date: data.created_date,
        is_deleted: data.is_deleted,
        applicant_idx: data.applicant_idx
    }, {
        where: {
            request_idx: data.request_idx
        }
    });
}