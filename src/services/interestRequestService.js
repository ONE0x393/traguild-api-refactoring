const InterestRequest = require('../models/InterestRequest');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');
const RequestInfo = require("@src/models/RequestInfo");

exports.createInterestRequest = async (data) => {
    return InterestRequest.create(data);
    const interest = await RequestInfo.create(data);

    await esClient.index({
        index: 'interest_request',
        id: interest.user_idx,
        body: interest
    });

    return interest;
}

exports.getAllInterestRequests = async () => {
    const { body } = await esClient.search({
        index: 'interest_request',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.getInterestRequestByUser = async (user_idx) => {
    const { body } = await esClient.search({
        index: 'interest_request',
        body: {
            query: {
                term: { user_idx: user_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.updateInterestRequest = async (data) => {



    await RequestInfo.update({
        user_idx: data.user_idx,
        request_idx: data.request_idx
    }, {
        where: {
            user_idx: data.user_idx
        }
    });
    await esClient.update({
        index: 'interest_request',
        id: data.user_idx,
        body: {
            doc: data
        }
    });
    return data;
}