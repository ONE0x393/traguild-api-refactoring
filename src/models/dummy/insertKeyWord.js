const KeyWord = require('@src/models/Keyword');

const insertKeyWord = async () => {
    return KeyWord.bulkCreate([
        {
            "keyword_user_idx": "1",
            "keyword_detail": "공사장 알바"
        },{
            "keyword_user_idx": "2",
            "keyword_detail": "행사장"
        },{
            "keyword_user_idx": "3",
            "keyword_detail": "상하차 새벽반"
        },{
            "keyword_user_idx": "4",
            "keyword_detail": "임상실험"
        },{
            "keyword_user_idx": "5",
            "keyword_detail": "아무거나"
        },
    ]);
}

module.exports = insertKeyWord;