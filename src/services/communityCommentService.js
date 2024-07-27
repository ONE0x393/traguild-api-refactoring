const CommunityComment = require('@src/models/CommunityComment');
const sequelize = require('@src/config/database');

exports.createCommunityComment = async (commentData) => {
    return CommunityComment.create(commentData);
}

exports.getCommunityCommentsByPost = async (post_idx) => {
    return CommunityComment.findAll({
        where: {
            post_idx : post_idx
        }
    });
}

exports.getCommunityCommentsByUser = async (user_idx) => {
    return CommunityComment.findAll({
        where: {
            user_idx : user_idx
        }
    });
}

exports.updateCommunityPost = async (commentData) => {
    return CommunityComment.update({
            cmt_detail: commentData.cmt_detail,
            updated_time: sequelize.fn('NOW')
        }, {
        where: {
            cmt_idx: commentData.cmt_idx,
            post_idx: commentData.post_idx,
            user_idx : commentData.user_idx
        }
    });
}