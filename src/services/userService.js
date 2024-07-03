const User = require('@src/models/User');
const sequelize = require('@src/config/database');

exports.getAllUsers = async () => {
    return await User.findAll();
}
exports.getIndexUsers = async (idx) => {
    //return await sequelize.query('SELECT * FROM Users WHERE user_idx = 1'); 중복 호출
    try {
        //const [results, metadata] = await sequelize.query("SELECT * FROM Users WHERE user_idx = ?",{ replacements: [user_idx], type: sequelize.QueryTypes.SELECT});
        const [results, metadata] = await sequelize.query(
            "SELECT * FROM Users WHERE user_idx = :user_idx",
            {
                replacements: { user_idx: idx},
                type: sequelize.QueryTypes.SELECT
            });
        return results; // 첫 번째 요소만 반환합니다.
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

exports.createUser = async (userData) => {
    return await User.create(userData);
}