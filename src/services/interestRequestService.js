const InterestRequest = require('../models/InterestRequest');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createInterestRequest = async (data) => {
    const interest = await InterestRequest.create(data);
    await esClient.index({
        index: 'interest_request',
        id: interest.interest_idx,
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



    await InterestRequest.update({
        user_idx: data.user_idx,
        request_idx: data.request_idx
    }, {
        where: {
            interest_idx: data.interest_idx
        }
    });
    await esClient.update({
        index: 'interest_request',
        id: data.interest_idx,
        body: {
            doc: data
        }
    });
    return data;
}