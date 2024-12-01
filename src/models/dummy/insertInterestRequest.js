const InterestRequest = require('@src/models/01-request/InterestRequest');

const insertInterestRequest = async () => {
    return InterestRequest.bulkCreate([
        {
            "user_idx": "1",
            "request_idx": "2"
        },{
            "user_idx": "1",
            "request_idx": "3"
        },{
            "user_idx": "3",
            "request_idx": "1"
        },{
            "user_idx": "4",
            "request_idx": "3"
        },{
            "user_idx": "5",
            "request_idx": "5"
        },
    ]);
}

module.exports = insertInterestRequest;