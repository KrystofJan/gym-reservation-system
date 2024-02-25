const wrkOutPlanMachinePresetManager = require('../Managers/WrkOutPlanMachinePresetManager');
const wrkOutPlanPresetManager = require('../Managers/WrkOutPlanPresetManager');
const wrkOutMachineManager = require('../Managers/WrkOutMachineManager');
const userManager = require('../Managers/UserManager');
const PresetModel = require('../ORM/Models/WrkOutPlanPreset');
const MachineModel = require('../ORM/Models/WrkOutMachine');
const WrkOutPlanMachinePreset = require('../ORM/Models/WrkOutPlanMachinePreset');
const UserModel = require('../ORM/Models/User');

const buildBody = async (planMachine) => {
    const result = [];

    for(const pm of planMachine){
        
        const planBody = await wrkOutPlanPresetManager.getId(pm.WrkOutPlanPresetId);
        const machineBody = await wrkOutMachineManager.getId(pm.WrkOutMachineId);
        const authorBody = await userManager.getId(planBody.AuthorId);

        const plan = new PresetModel(planBody);
        const machine = new MachineModel(machineBody);
        const author = new UserModel(authorBody)
        plan.author = author.constructJson();

        const model = new WrkOutPlanMachinePreset({
            "WrkOutPlanPreset": plan.constructJson(),
            "WrkOutMachine": machine.constructJson(),
            "Sets": pm.sets,
            "Reps": pm.reps,
        });

        result.push(model.constructJson());
    }
    return result;
}

const getIdPreset = async (req,res,id) => {
    try{
        const planMachine = await wrkOutPlanMachinePresetManager.getIdPreset(id);

        const result = await buildBody(planMachine);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getIdMachine = async (req,res,id) => {
    try{
        const planMachine = await wrkOutPlanMachinePresetManager.getIdMachine(id);
        
        const result = await buildBody(planMachine);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;
        const result = await wrkOutPlanMachinePresetManager.post(body);

        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getIdPreset,
    getIdMachine,
    post,
}