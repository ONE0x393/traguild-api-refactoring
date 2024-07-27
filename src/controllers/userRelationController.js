const userRelationService = require('@src/services/userRelationService');

exports.createUserRelation = async (req, res) => {
    try{
        const user = await userRelationService.createUserRelation(req.body);
        res.status(201).json(user);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getUserRelations = async (req, res) => {
    try{
        const users = await userRelationService.getUserRelations(req.body.user_idx);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.deleteUserRelations = async (req, res) => {
    try{
        const users = await userRelationService.deleteUserRelations(req.body);
        res.json(users);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}