const User = require('@src/models/User');
const UserInfo = require('@src/models/UserInfo');
const UserRelation = require('@src/models/UserRelation');
const CommunityPost = require('@src/models/CommunityPost');
const CommunityComment = require('@src/models/CommunityComment');
const Report = require('@src/models/Report');

module.exports = {
    User,
    Report,
    UserInfo,
    UserRelation,
    CommunityPost,
    CommunityComment
};