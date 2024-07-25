const User = require('@src/models/User');
const UserInfo = require('@src/models/UserInfo');
const UserRelation = require('@src/models/UserRelation');
const CommunityPost = require('@src/models/CommunityPost');
const CommunityComment = require('@src/models/CommunityComment');
const Report = require('@src/models/Report');
const AlarmType = require('@src/models/AlarmType');
const Keyword = require('@src/models/Keyword');
const InterestRequest = require('@src/models/InterestRequest');
const RequestInfo = require('@src/models/RequestInfo');
const RequestApplicant = require('@src/models/RequestApplicant');

module.exports = {
    User,
    Report,
    UserInfo,
    AlarmType,
    Keyword,
    InterestRequest,
    RequestInfo,
    RequestApplicant,
    UserRelation,
    CommunityPost,
    CommunityComment
};