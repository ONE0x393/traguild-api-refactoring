const CommunityPost = require('@src/models/CommunityPost');
const sequelize = require('@src/config/database');

exports.createCommunityPost = async (postData) => {
    return CommunityPost.create(postData);
}

exports.getAllCommunityPosts = async () => {
    return CommunityPost.findAll();
}

exports.getCommunityPostsByUser = async (user_idx) => {
    return CommunityPost.findAll({
        where: {
            user_idx : user_idx
        }
    });
}

exports.updateCommunityPost = async (postData) => {
    return CommunityPost.update({
            post_name: postData.post_name,
            post_detail: postData.post_detail,
            updated_time: sequelize.fn('NOW')
        }, {
        where: {
            post_idx: postData.post_idx,
            user_idx : postData.user_idx
        }
    });
}