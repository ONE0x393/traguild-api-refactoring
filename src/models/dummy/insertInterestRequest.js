const InterestRequest = require('@src/models/01-request/InterestRequest');

const insertInterestRequest = async () => {
    return InterestRequest.bulkCreate([
        {
            "user_idx": 1,
            "request_idx":1,
        },
    ]);
}

module.exports = insertInterestRequest;