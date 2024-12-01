const UserInfo = require('../../models/00-userInfo/UserInfo');
const sequelize = require('../../config/database');

exports.getLogin = async (data) => {
    try{
        const login_result = await sequelize.query(
            `
            SELECT user_idx
            FROM TB_USER_INFO
            WHERE user_id = :user_id
            AND user_pw = :user_pw
            `,
            {
                replacements: {
                    user_id: data.user_id,  // data 객체에서 user_id를 직접 참조
                    user_pw: data.user_pw   // data 객체에서 user_pw를 직접 참조
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        if (login_result.length === 0) {
            return { user_idx: -1 };
        }

        return login_result[0];

    }
    catch (error){
        console.error('Error during login:', error);
        throw new Error('An error occurred while processing the login request');
    }
}

