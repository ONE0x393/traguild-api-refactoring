const requestInfoService = require('@src/services/requestInfoService');

exports.createRequestInfo= async (req, res) => {
    try{
        const requestInfo = await requestInfoService.createRequestInfo(req.body);
        res.status(201).json(requestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestInfos = async (req, res) => {
    try{
        const requestInfo = await requestInfoService.getAllRequestInfos();
        res.json(requestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.getRequestInfoByIdx = async (req, res) => {
    try{
        const requestInfo = await requestInfoService.getRequestInfoByIdx(req.body.request_idx);
        res.json(requestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestInfo = async (req, res) => {
    try{
        const requestInfo = await requestInfoService.updateRequestInfo(req.body);
        res.json(requestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}