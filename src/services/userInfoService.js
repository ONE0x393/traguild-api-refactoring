const UserInfo = require('../models/UserInfo');
const sequelize = require('../config/database');

exports.createUser = async (userData) => {
    return UserInfo.create(userData);
}

exports.getAllUsers = async () => {
    return await UserInfo.findAll();
}

exports.getUser = async (user_idx) => {
    return UserInfo.findByPk(user_idx);
}

exports.updateUser = async (userData) => {
    return await UserInfo.update({
        user_pw: userData.user_pw,
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_birth: userData.user_birth,
        user_rate: userData.user_rate,
        is_agree_privacy: userData.is_agree_privacy,
        last_login_time: userData.last_login_time
    }, {
        where: {
            user_idx: userData.user_idx
        }
    });
}