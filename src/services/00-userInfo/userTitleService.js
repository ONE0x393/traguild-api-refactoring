const UserTitle = require('../../models/00-userInfo/UserTitle');
const sequelize = require('../../config/database');

exports.createUserTitle = async (data) => {
    return UserTitle.create(data);
}

exports.getUserTitles = async (data) => {
    return UserTitle.findAll({
        attributes: ['user_title'],
        where: {
            user_level: data.user_level
        }
    });
}

exports.updateUserTitle = async (data) => {
    await UserTitle.update(
        {
            user_title: data.user_title
        },
        { where:
                {
                    user_level: data.user_level
                }
        }
    );
    return data;
};