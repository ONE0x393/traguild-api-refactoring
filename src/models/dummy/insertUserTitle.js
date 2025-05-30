const UserTitle = require('@src/models/00-userInfo/UserTitle');

const insertUserTitle = async () => {
    return UserTitle.bulkCreate([
        { "user_level": 1, "user_title": "신입 모험가" },
        { "user_level": 2, "user_title": "초보 모험가" },
        { "user_level": 3, "user_title": "성장하는 모험가" },
        { "user_level": 4, "user_title": "숙련된 모험가" },
        { "user_level": 5, "user_title": "능숙한 모험가" },
        { "user_level": 6, "user_title": "베테랑 모험가" },
        { "user_level": 7, "user_title": "명인 모험가" },
        { "user_level": 8, "user_title": "고수 모험가" },
        { "user_level": 9, "user_title": "대가 모험가" },
        { "user_level": 10, "user_title": "전설 모험가" }
    ]);
}

module.exports = insertUserTitle;