const alarmTypeService = require('@src/services/alarmTypeService');

exports.createAlarmType= async (req, res) => {
    try{
        const alarmtype = await alarmTypeService.createAlarmType(req.body);
        res.status(201).json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllAlarmTypes = async (req, res) => {
    try{
        const alarmtype = await alarmTypeService.getAllAlarmTypes();
        res.json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateAlarmType = async (req, res) => {
    try{
        const alarmtype = await alarmTypeService.updateAlarmType(req.body);
        res.json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}