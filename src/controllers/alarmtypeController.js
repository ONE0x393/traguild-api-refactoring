const alarmtypeService = require('@src/services/alarmtypeService');

exports.createAlarmType= async (req, res) => {
    try{
        const alarmtype = await alarmtypeService.createAlarmType(req.body);
        res.status(201).json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
};

exports.getAllAlarmTypes = async (req, res) => {
    try{
        const alarmtype = await alarmtypeService.getAllAlarmTypes();
        res.json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}

exports.updateAlarmType = async (req, res) => {
    try{
        const alarmtype = await alarmtypeService.updateAlarmType(req.body);
        res.json(alarmtype);
    } catch (e){
        res.status(500).json({message: e.message});
    }
}