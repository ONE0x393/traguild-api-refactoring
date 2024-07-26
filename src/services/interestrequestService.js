const InterestRequest = require('@src/models/InterestRequest');
const sequelize = require('@src/config/database');

exports.createInterestRequest = async (Data) => {
    return InterestRequest.create(Data);
}

exports.getAllInterestRequests = async () => {
    return await InterestRequest.findAll();
}

exports.updateInterestRequest = async (Data) => {

    return await InterestRequest.update({
        user_idx: Data.user_idx,
        request_idx: Data.request_idx
    }, {
        where: {
            user_idx: Data.user_idx,
        }
    });
}