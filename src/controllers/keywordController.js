const keywordService = require('@src/services/keywordService');

exports.createKeyword = async (req, res) => {
    try{
        const keyword = await keywordService.createKeyword(req.body);
        res.status(201).json(keyword);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllKeywords = async (req, res) => {
    try{
        const keywords = await keywordService.getAllKeywords();
        res.json(keywords);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateKeyword = async (req, res) => {
    try{
        const keywords = await keywordService.updateKeyword(req.body);
        res.json(keywords);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}