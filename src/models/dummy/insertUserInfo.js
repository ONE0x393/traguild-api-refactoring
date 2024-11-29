const UserInfo = require('@src/models/UserInfo');

const insertUserInfo = async () => {
    return UserInfo.bulkCreate([
        {
            "user_id": "gdhong",
            "user_pw": "mypassword",
            "user_name": "홍길동",
            "user_region": "경상남도 창원시",
            "user_email": "gdhong@gmail.com",
            "user_nickname": "율도국 대가리",
            "user_credit": 777,
            "user_birth": "1900-01-01"
        },{
            "user_id": "userid1",
            "user_pw": "privatepassword1",
            "user_name": "김철수",
            "user_region": "경상남도 김해시",
            "user_email": "cskim@gmail.com",
            "user_nickname": "철수를 구하시오",
            "user_credit": 540,
            "user_birth": "1978-12-30"
        },{
            "user_id": "userid2",
            "user_pw": "privatepassword2",
            "user_name": "김영희",
            "user_region": "경기도 수원시",
            "user_email": "yhkim@gmail.com",
            "user_nickname": "교과서 단골손님",
            "user_credit": 670,
            "user_birth": "2000-09-01"
        },{
            "user_id": "userid3",
            "user_pw": "privatepassword3",
            "user_name": "점순이",
            "user_region": "충청남도 대전시",
            "user_email": "dotgirl@naver.com",
            "user_nickname": "국어문학 셀럽",
            "user_credit": 120,
            "user_birth": "1997-03-01"
        },{
            "user_id": "userid4",
            "user_pw": "privatepassword4",
            "user_name": "김민재",
            "user_region": "경기도 일산시",
            "user_email": "minkim@gmail.com",
            "user_nickname": "늬들은 결혼하지 마라",
            "user_credit": 1200,
            "user_birth": "2004-07-03"
        },
    ]);
}

module.exports = insertUserInfo;