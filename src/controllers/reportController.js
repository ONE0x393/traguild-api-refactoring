const reportService = require('@src/services/reportService');

exports.createReport = async (req, res) => {
    try{
        const resData = await reportService.createReport(req.body);
        res.status(201).json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllReports = async (req, res) => {
    try{
        const resData = await reportService.getAllReports();
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}
exports.getReportsByUser = async (req, res) => {
    try{
        const resData = await reportService.getReportsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}