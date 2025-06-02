const { literal } = require('sequelize');
const UserInfo = require('../../models/00-userInfo/UserInfo');
const sequelize = require('../../config/database');

exports.createUser = async (userData) => {
    return UserInfo.create(userData);
}

exports.getAllUsers = async () => {
    const results = await sequelize.query(`
        SELECT 
            ui.*,
            ut.user_title
        FROM 
            TB_USER_INFO AS ui
        LEFT JOIN 
            TB_USER_TITLE AS ut
        ON 
            ui.user_level = ut.user_level
    `, {
        type: sequelize.QueryTypes.SELECT
    });

    return results;
}

exports.getUser = async (user_idx) => {
    const result = await sequelize.query(`
        SELECT 
            ui.*, 
            ut.user_title
        FROM 
            TB_USER_INFO AS ui
        LEFT JOIN 
            TB_USER_TITLE AS ut
        ON 
            ui.user_level = ut.user_level
        WHERE 
            ui.user_idx = :user_idx
        LIMIT 1;
    `, {
        replacements: { user_idx },   // SQL 바인딩
        type: sequelize.QueryTypes.SELECT
    });

    if (!result || result.length === 0) {
        return {};
    }

    return result[0];
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
    const updateData = {
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
    };
    if (userData.user_exp !== undefined && typeof userData.user_exp === 'number') { //user_exp 데이터가 있는 경우
        // 현재 사용자 정보 조회
        const user = await UserInfo.findOne({ where: { user_idx: userData.user_idx } });
        if (!user) throw new Error("User not found");

        // EXP 계산 및 레벨업 처리
        let newExp = user.user_exp + userData.user_exp;
        let newLevel = user.user_level;

        if (newExp < 0) {//exp 계산 결과가 0보다 작으면 0으로 고정
            newExp = 0;
        }

        while (newExp >= newLevel * 3) { //경험치 통을 초과하는 경우
            if(newLevel == 10){ //최대레벨의 경우 경험치를 최대로 유지
                newExp = newLevel*3;
                break;
            }
            else{
                newExp -= newLevel * 3; //레벨업 하고 남은 exp를 저장
                newLevel += 1; //레벨업
            }
        }

        // 반드시 updateData에 exp와 level 추가
        updateData.user_exp = newExp;
        updateData.user_level = newLevel;
    }
    await UserInfo.update(updateData, {
        where: { user_idx: userData.user_idx }
    });

    const updatedUser = await UserInfo.findOne({
        where: { user_idx: userData.user_idx }
    });

    return updatedUser;
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
    const creditToAdd = parseInt(userData.user_credit, 10);
    if (isNaN(creditToAdd)) {
        throw new Error('Invalid credit value');
    }

    return await UserInfo.update({
        user_credit: literal(`user_credit + ${creditToAdd}`),
    }, {
        where: {
            user_idx: userData.user_idx
        }
    });
};
