const wrkOutPlanMachineManager = require('../Managers/WrkOutPlanMachineManager');
const wrkOutPlanManager = require('../Managers/WrkOutPlanManager');
const wrkOutMachineManager = require('../Managers/WrkOutMachineManager');
const PlanModel = require('../ORM/Models/WrkOutPlan');
const MachineModel = require('../ORM/Models/WrkOutMachine');
const WrkOutPlanMachine = require('../ORM/Models/WrkOutPlanMachine');

const buildBody = async (planMachine) => {
    const result = [];

    for(const pm of planMachine){
        
        const planBody = await wrkOutPlanManager.getId(pm.WrkOutPlanId);
        const machineBody = await wrkOutMachineManager.getId(pm.WrkOutMachineId);

        const plan = new PlanModel(planBody);
        const machine = new MachineModel(machineBody);

        const model = new WrkOutPlanMachine({
            "WrkOutPlan": plan.constructJson(),
            "WrkOutMachine": machine.constructJson(),
            "Sets": pm.sets,
            "Reps": pm.reps,
            "WrkOutStartTime": pm.wrkOutStartTime,
            "WrkOutEndTime": pm.wrkOutEndTime,
            "CanDisturb": pm.canDisturb ? true : false
        });

        result.push(model.constructJson(model));
    }
    return result;
}

const getIdPlan = async (req,res,id) => {
    try{
        const planMachine = await wrkOutPlanMachineManager.getIdPlan(id);

        const result = await buildBody(planMachine);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getIdMachine = async (req,res,id) => {
    try{
        const planMachine = await wrkOutPlanMachineManager.getIdMachine(id);
        
        const result = await buildBody(planMachine);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        // TODO: Maybe make a better response because I kinda need the id...
        const body = req.body;
        let response = {};

        if (body.WrkOutMachines){
            for(let b of body.WrkOutMachines){
                const result = await wrkOutPlanMachineManager.post(
                    {
                        "WrkOutPlanId": body.WrkOutPlanId,
                        "WrkOutMachineId": b.WrkOutMachineId,
                        "Reps": b.Reps,
                        "Sets": b.Sets,
                        "WrkOutStartTime": b.WrkOutStartTime,
                        "WrkOutEndTime": b.WrkOutEndTime,
                        "CanDisturb": true
                    }
                );
            }
            response = {"Status": `Created ${ids.length} Machine plan connections for the ${body.WrkOutPlanId}`};
        } 
        else{
            response  = await wrkOutPlanMachineManager.post(body);
        }

        res.status(201).json(response);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getIdPlan,
    getIdMachine,
    post,
}