const UserInfo = require('../models/UserInfo');
const sequelize = require('../config/database');

exports.getLogin = async (data) => {
    try{
        const login_result = await UserInfo.findOne({
            where:{
                user_id: data.user_id,
                user_pw: data.user_pw
            }
        });

        if(!login_result) return login_result.user_idx=-1;

        return login_result.user_idx;

    }
    catch (error){
        console.error('Error during login:', error);
        throw new Error('An error occurred while processing the login request');
    }
}

