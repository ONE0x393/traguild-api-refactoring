const UserRelation = require('@src/models/UserRelation');

const insertUserRelation = async () => {
    return UserRelation.bulkCreate([
        {
            "user_idx": 1,
            "follower_idx": 2,
        },{
            "user_idx": 2,
            "follower_idx": 1,
        },{
            "user_idx": 1,
            "follower_idx": 3,
        },{
            "user_idx": 1,
            "follower_idx": 4,
        },{
            "user_idx": 4,
            "follower_idx": 1,
        },
    ]);
}

module.exports = insertUserRelation;