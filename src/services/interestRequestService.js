const InterestRequest = require('../models/InterestRequest');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createInterestRequest = async (data) => {
    const interest = await InterestRequest.create(data);
    if (interest.interest_idx) {
        await esClient.index({
            index: 'interest_request',
            id: interest.interest_idx,  // DB에서 생성된 interest_idx를 안전하게 사용
            body: interest  // 삽입된 interest 객체
        });
    } else {
        throw new Error("Failed to create interest request or interest_idx is missing");
    }
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
            user_idx: data.user_idx
        }
    });
    if (data.interest_idx) {
        await esClient.update({
            index: 'interest_request',
            id: data.interest_idx,
            body: {
                doc: data
            }
        });
    } else {
        throw new Error("Failed to create interest request or interest_idx is missing");
    }

    return data;
}