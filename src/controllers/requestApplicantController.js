const requestApplicantService = require('@src/services/requestApplicantService');

exports.createRequestApplicant= async (req, res) => {
    try{
        const RequestApplicant = await requestApplicantService.createRequestApplicant(req.body);
        res.status(201).json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestApplicants = async (req, res) => {
    try{
        const RequestApplicant = await requestApplicantService.getAllRequestApplicants();
        res.json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestApplicant = async (req, res) => {
    try{
        const RequestApplicant = await requestApplicantService.updateRequestApplicant(req.body);
        res.json(RequestApplicant);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}