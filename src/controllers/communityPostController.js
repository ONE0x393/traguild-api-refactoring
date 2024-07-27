const communityPostService = require('@src/services/communityPostService');

exports.createCommunityPost = async (req, res) => {
    try{
        const resData = await communityPostService.createCommunityPost(req.body);
        res.status(201).json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllCommunityPosts = async (req, res) => {
    try{
        const resData = await communityPostService.getAllCommunityPosts();
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getCommunityPostsByUser = async (req, res) => {
    try{
        const resData = await communityPostService.getCommunityPostsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateCommunityPost = async (req, res) => {
    try{
        const resData = await communityPostService.updateCommunityPost(req.body);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}