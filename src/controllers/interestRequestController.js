const interestRequestService = require('@src/services/interestRequestService');

exports.createInterestRequest= async (req, res) => {
    try{
        const InterestRequest = await interestRequestService.createInterestRequest(req.body);
        res.status(201).json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllInterestRequests = async (req, res) => {
    try{
        const InterestRequest = await interestRequestService.getAllInterestRequests();
        res.json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateInterestRequest = async (req, res) => {
    try{
        const InterestRequest = await interestRequestService.updateInterestRequest(req.body);
        res.json(InterestRequest);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}