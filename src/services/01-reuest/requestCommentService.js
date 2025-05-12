const RequestComment = require('../../models/01-request/RequestComment');
const sequelize = require('../../config/database');
const esClient = require('../../config/esClient');
const InterestRequest = require("@src/models/01-request/InterestRequest");

exports.createRequestComment = async (data) => {
    const now = new Date();
    data.created_date = now.toISOString();
    data.updated_date = now.toISOString();

    const requestComment = await RequestComment.create(data);

    await esClient.index({
        index: 'request_comment',
        id: requestComment.comment_idx,
        body: requestComment
    });

    return requestComment;
    //return RequestComment.create(data);
}

exports.getAllRequestComments = async () => {
    const { body } = await esClient.search({
        index: 'request_comment',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestComment.findAll();
}

exports.getRequestCommentsByIDX = async (request_idx) => {
    const { body: exists } = await esClient.indices.exists({ index: 'request_comment' });
    if (!exists) {
        return [];
    }

    const { body } = await esClient.search({
        index: 'request_comment',
        _source: ['comment_idx', 'user_idx', 'comment', 'updated_date'], // 반환할 필드 지정
        body: {
            query: {
                bool: {
                    must: [
                        { term: { request_idx: request_idx } },
                        { term: { is_deleted: false } }
                    ]
                }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.updateRequestComment = async (data) => {
    const now = new Date();
    data.updated_date = now.toISOString();

    await RequestComment.update({
        user_idx: data.user_idx,
        request_idx: data.request_idx,
        comment: data.comment,
        created_date: data.created_date,
        updated_date: data.updated_date,
        is_deleted: data.is_deleted,
    }, {
        where: {
            comment_idx: data.comment_idx,
        }
    });
    await esClient.update({
        index: 'request_comment',
        id: data.comment_idx,
        body: {
            doc: data
        }
    });
    return data;
}

exports.deleteRequestComment = async (comment_idx) => {
    // Elasticsearch에서 데이터 삭제
    await esClient.delete({
        index: 'request_comment',
        id: comment_idx
    });

    // 데이터베이스에서 RequestComment 데이터 삭제
    await RequestComment.destroy({
        where: { comment_idx: comment_idx }
    });

    return { message: 'Request Comment deleted successfully' };
};