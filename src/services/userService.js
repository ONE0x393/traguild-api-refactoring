const User = require('@src/models/User');

exports.getAllUsers = async () => {
    return await User.findAll();
}

exports.createUser = async (userData) => {
    return await User.create(userData);
}