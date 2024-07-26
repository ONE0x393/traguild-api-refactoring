const RequestInfoService = require('@src/services/requestinfoService');

exports.createRequestInfo= async (req, res) => {
    try{
        const RequestInfo = await RequestInfoService.createRequestInfo(req.body);
        res.status(201).json(RequestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestInfos = async (req, res) => {
    try{
        const RequestInfo = await RequestInfoService.getAllRequestInfos();
        res.json(RequestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.getRequestInfo = async (req, res) => {
    try{
        const requesetinfo = await RequestInfoService.getRequestInfo(req.body.request_idx);
        res.json(requesetinfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestInfo = async (req, res) => {
    try{
        const RequestInfo = await RequestInfoService.updateRequestInfo(req.body);
        res.json(RequestInfo);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}