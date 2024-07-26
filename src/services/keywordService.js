const Keyword = require('@src/models/Keyword');
const sequelize = require('@src/config/database');

exports.createKeyword = async (keywordData) => {
    return Keyword.create(keywordData);
}

exports.getAllKeywords = async () => {
    return await Keyword.findAll();
}

exports.updateKeyword = async (keywordData) => {

    return await Keyword.update({
        keyword_user_idx: keywordData.keyword_user_idx,
        keyword_detail: keywordData.keyword_detail
    }, {
        where: {
            keyword_user_idx: keywordData.keyword_user_idx
        }
    });
}