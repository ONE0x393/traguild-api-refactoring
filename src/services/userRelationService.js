const UserRelation = require('../models/UserRelation');
const sequelize = require('../config/database');

exports.createUserRelation = async (relationData) => {
    return UserRelation.create(relationData);
}

exports.getUserRelations = async (user_idx) => {
    return UserRelation.findAll({
        where: {
            user_idx: user_idx
        }
    });
}

exports.deleteUserRelations = async (relationData) => {
    return UserRelation.destroy({
        where: {
            user_idx: relationData.user_idx,
            follower_idx: relationData.follower_idx
        }
    });
}