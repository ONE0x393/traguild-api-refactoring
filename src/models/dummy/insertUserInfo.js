const UserInfo = require('@src/models/UserInfo');

const insertUserInfo = async () => {
    return UserInfo.bulkCreate([
        {
            "user_id": "gdhong",
            "user_pw": "mypassword",
            "user_name": "홍길동",
            "user_email": "gdhong@gmail.com",
            "user_birth": "1900-01-01"
        },{
            "user_id": "userid1",
            "user_pw": "privatepassword1",
            "user_name": "김철수",
            "user_email": "cskim@gmail.com",
            "user_birth": "1978-12-30"
        },{
            "user_id": "userid2",
            "user_pw": "privatepassword2",
            "user_name": "김영희",
            "user_email": "yhkim@gmail.com",
            "user_birth": "2000-09-01"
        },{
            "user_id": "userid3",
            "user_pw": "privatepassword3",
            "user_name": "점순이",
            "user_email": "dotgirl@naver.com",
            "user_birth": "1997-03-01"
        },{
            "user_id": "userid4",
            "user_pw": "privatepassword4",
            "user_name": "김민재",
            "user_email": "minkim@gmail.com",
            "user_birth": "2004-07-03"
        },
    ]);
}

module.exports = insertUserInfo;