const userInfoService = require('@src/services/userInfoService');

exports.createUser = async (req, res) => {
    try{
        const user = await userInfoService.createUser(req.body);
        res.status(201).json(user);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userInfoService.getAllUsers();
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getUser = async (req, res) => {
    try{
        const users = await userInfoService.getUser(req.body.user_idx);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const users = await userInfoService.updateUser(req.body);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}