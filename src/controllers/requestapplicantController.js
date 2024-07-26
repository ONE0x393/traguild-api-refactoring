const RequestApplicantService = require('@src/services/requestapplicantService');

exports.createRequestApplicant= async (req, res) => {
    try{
        const RequestApplicant = await RequestApplicantService.createRequestApplicant(req.body);
        res.status(201).json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestApplicants = async (req, res) => {
    try{
        const RequestApplicant = await RequestApplicantService.getAllRequestApplicants();
        res.json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestApplicant = async (req, res) => {
    try{
        const RequestApplicant = await RequestApplicantService.updateRequestApplicant(req.body);
        res.json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}