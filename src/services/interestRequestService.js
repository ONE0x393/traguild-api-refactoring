const InterestRequest = require('../models/InterestRequest');
const sequelize = require('../config/database');

exports.createInterestRequest = async (data) => {
    return InterestRequest.create(data);
}

exports.getAllInterestRequests = async () => {
    return await InterestRequest.findAll();
}

exports.updateInterestRequest = async (data) => {

    return await InterestRequest.update({
        user_idx: data.user_idx,
        request_idx: data.request_idx
    }, {
        where: {
            user_idx: data.user_idx,
        }
    });
}