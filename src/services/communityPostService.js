const CommunityPost = require('../models/CommunityPost');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createCommunityPost = async (postData) => {
    const now = new Date();
    postData.created_time = now.toISOString();
    postData.updated_time = now.toISOString();

    const post = await CommunityPost.create(postData);

    await esClient.index({
        index: 'community_post',
        id: post.post_idx,
        body: post
    });

    return post;
}

exports.getAllCommunityPosts = async () => {
    const { body } = await esClient.search({
        index: 'community_post',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.getCommunityPostsByUser = async (user_idx) => {
    const { body } = await esClient.search({
        index: 'community_post',
        body: {
            query: {
                term: { user_idx: user_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.updateCommunityPost = async (postData) => {
    const now = new Date();
    postData.updated_time = now.toISOString();

    const post = await CommunityPost.update({
            post_name: postData.post_name,
            post_detail: postData.post_detail,
            updated_time: postData.updated_time
        }, {
        where: {
            post_idx: postData.post_idx,
            user_idx : postData.user_idx
        }
    });

    await esClient.update({
        index: 'community_post',
        id: postData.post_idx,
        body: {
            doc: postData
        }
    });

    return post;
}