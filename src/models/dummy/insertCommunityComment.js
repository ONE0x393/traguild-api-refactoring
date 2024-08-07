const CommunityComment = require('@src/models/CommunityComment');
const esClient = require('@src/config/esClient');

const insertCommunityComment = async () => {
    const comments =  await CommunityComment.bulkCreate([
        {
            "post_idx": 1,
            "user_idx": 1,
            "cmt_detail": "첫 댓글입니다. 잘 부탁드립니다.",
            "created_time": "2021-01-01 00:00:00",
            "updated_time": "2021-01-01 00:00:00",
            "is_deleted": false,
        }, {
            "post_idx": 1,
            "user_idx": 2,
            "cmt_detail": "만나서 반가워요",
            "created_time": "2021-08-09 00:00:00",
            "updated_time": "2021-08-20 00:00:00",
            "is_deleted": false,
        }, {
            "post_idx": 2,
            "user_idx": 1,
            "cmt_detail": "환영합니다.",
            "created_time": "2021-12-01 00:00:00",
            "updated_time": "2021-12-01 00:00:00",
            "is_deleted": false,
        }, {
            "post_idx": 1,
            "user_idx": 4,
            "cmt_detail": "어서오세요",
            "created_time": "2023-02-04 00:00:00",
            "updated_time": "2023-02-21 00:00:00",
            "is_deleted": false,
        }, {
            "post_idx": 4,
            "user_idx": 1,
            "cmt_detail": "게시글 그렇게 쓰시면 안 돼요",
            "created_time": "2024-03-01 00:00:00",
            "updated_time": "2024-03-11 00:00:00",
            "is_deleted": false,
        },
    ]);

    for(comment of comments){
        await esClient.index({
            index: 'community_comment',
            id: comment.cmt_idx,
            body: comment
        });
    }

    return comments;
}

module.exports = insertCommunityComment;