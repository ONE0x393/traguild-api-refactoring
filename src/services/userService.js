const User = require('@src/models/User');
const sequelize = require('@src/config/database');

exports.getAllUsers = async () => {
    return await User.findAll();
}

exports.createUser = async (userData) => {
    return await User.create(userData);
}