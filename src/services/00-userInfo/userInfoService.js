const UserInfo = require('../../models/00-userInfo/UserInfo');
const sequelize = require('../../config/database');

exports.createUser = async (userData) => {
    return UserInfo.create(userData);
}

exports.getAllUsers = async () => {
    return await UserInfo.findAll(
        {attributes: {
                exclude: ['user_pw'] // user_pw를 제외
            }}
    );
}

exports.getUser = async (user_idx) => {
    return UserInfo.findOne({
        where: {
            user_idx: user_idx // user_idx로 검색
        }
    });
}

exports.getUserInfoById = async (user_id) => {
    return UserInfo.findOne({
        where: {
            user_id: user_id
        }
    });
}

exports.getUserWithImg = async (user_idx) => {
    return UserInfo.findOne({
        where: {
            user_idx: user_idx // user_idx로 검색
        },
        attributes: ['user_img'] // 필요한 필드만 가져오기
    });
}

exports.updateUser = async (userData) => {
    return await UserInfo.update({
        user_pw: userData.user_pw,
        user_nickname: userData.user_nickname,
        user_region: userData.user_region,
        user_credit: userData.user_credit,
        user_birth: userData.user_birth,
        user_rate: userData.user_rate,
        user_like: userData.user_like,
        user_dislike: userData.user_dislike,
        is_agree_privacy: userData.is_agree_privacy,
        is_available: userData.is_available,
    }, {
        where: {
            user_idx: userData.user_idx
        }
    });
}

exports.updateUserImg = async (fileData, userData) => {
    return await UserInfo.update({
        user_img: fileData.path,
    }, {
        where: {
            user_idx: userData.user_idx
        }
    });
}

exports.updateUserForCredit = async (userData) => {
    return await UserInfo.update({
        user_credit: userData.user_credit,
    }, {
        where: {
            user_idx: userData.user_idx
        }
    });
}