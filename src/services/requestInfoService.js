const RequestInfo = require('../models/RequestInfo');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createRequestInfo = async (data) => {
    const now = new Date();
    data.created_date = now.toISOString();
    data.updated_time = now.toISOString();

    const request = await RequestInfo.create(data);

    await esClient.index({
        index: 'request_info',
        id: request.request_idx,
        body: request
    });

    return request;
    //return RequestInfo.create(data);
}

exports.getAllRequestInfos = async () => {
    const { body } = await esClient.search({
        index: 'request_info',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getRequestInfoByIdx = async (request_idx) => {
    const { body } = await esClient.search({
        index: 'request_info',
        body: {
            query: {
                term: { request_idx: request_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.updateRequestInfo = async (data) => {
    const now = new Date();
    data.updated_time = now.toISOString();

    await RequestInfo.update({
        request_idx: data.request_idx,
        user_idx: data.user_idx,
        request_region: data.request_region,
        request_title: data.request_title,
        request_content: data.request_content,
        request_cost: data.request_cost,
        request_state: data.request_state,
        created_date: data.created_date,
        is_deleted: data.is_deleted,
        applicant_idx: data.applicant_idx
    }, {
        where: {
            request_idx: data.request_idx,
            user_idx: data.user_idx
        }
    });
    await esClient.update({
        index: 'request_info',
        id: data.request_idx,
        body: {
            doc: data
        }
    });
    return data;
}