const userService = require('@src/services/userService');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getIndexUsers = async (req, res) => {
    try{
        const users = await userService.getIndexUsers(req.query.user_idx);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.createuser = async (req, res) => {
    try{
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};