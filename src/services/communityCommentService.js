const CommunityComment = require('@src/models/CommunityComment');
const sequelize = require('@src/config/database');
const esClient = require('@src/config/esClient');

exports.createCommunityComment = async (commentData) => {
    const now = new Date();
    commentData.created_time = now.toISOString();
    commentData.updated_time = now.toISOString();

    const comment = await CommunityComment.create(commentData);

    await esClient.index({
        index: 'community_comment',
        id: comment.cmt_idx,
        body: comment
    });

    return comment;
}

exports.getCommunityCommentsByPost = async (post_idx) => {
    const { body } = await esClient.search({
        index: 'community_comment',
        body: {
            query: {
                term: { post_idx: post_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.getCommunityCommentsByUser = async (user_idx) => {
    const { body } = await esClient.search({
        index: 'community_comment',
        body: {
            query: {
                term: { user_idx: user_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.updateCommunityPost = async (commentData) => {
    const now = new Date();
    commentData.updated_time = now.toISOString();

    const comment = await CommunityComment.update({
            cmt_detail: commentData.cmt_detail,
            updated_time: commentData.updated_time
        }, {
        where: {
            cmt_idx: commentData.cmt_idx,
            post_idx: commentData.post_idx,
            user_idx : commentData.user_idx
        }
    });

    await esClient.update({
        index: 'community_comment',
        id: commentData.cmt_idx,
        body: {
            doc: commentData
        }
    });

    return comment;
}