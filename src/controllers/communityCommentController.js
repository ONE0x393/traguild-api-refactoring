const communityCommentService = require('@src/services/communityCommentService');

exports.createCommunityComment = async (req, res) => {
    try{
        const resData = await communityCommentService.createCommunityComment(req.body);
        res.status(201).json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getCommunityCommentsByPost = async (req, res) => {
    try{
        const resData = await communityCommentService.getCommunityCommentsByPost(req.body.post_idx);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getCommunityCommentsByUser = async (req, res) => {
    try{
        const resData = await communityCommentService.getCommunityCommentsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateCommunityPost = async (req, res) => {
    try{
        const resData = await communityCommentService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}