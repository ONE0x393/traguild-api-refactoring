const InterestRequest = require('@src/models/01-request/InterestRequest');

const insertInterestRequest = async () => {
    return InterestRequest.bulkCreate([

    ]);
}

module.exports = insertInterestRequest;