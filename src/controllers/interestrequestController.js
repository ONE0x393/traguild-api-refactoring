const InterestRequestService = require('@src/services/interestrequestService');

exports.createInterestRequest= async (req, res) => {
    try{
        const InterestRequest = await InterestRequestService.createInterestRequest(req.body);
        res.status(201).json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllInterestRequests = async (req, res) => {
    try{
        const InterestRequest = await InterestRequestService.getAllInterestRequests();
        res.json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateInterestRequest = async (req, res) => {
    try{
        const InterestRequest = await InterestRequestService.updateInterestRequest(req.body);
        res.json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}