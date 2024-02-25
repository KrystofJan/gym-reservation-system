const wrkOutPlanTypeManager = require('../Managers/WrkOutPlanTypeManager');
const wrkOutPlanManager = require('../Managers/WrkOutPlanManager');
const typeManager = require('../Managers//ExerciseTypeManager');
const PlanModel = require('../ORM/Models/WrkOutPlan');
const ExerciseTypeModel = require('../ORM/Models/ExerciseType');
const WrkOutMachinePlanModel = require('../ORM/Models/WrkOutPlanType');

const buildBody = async (planType) => {
    const result = [];

    for(const pt of planType){
        
        const planBody = await wrkOutPlanManager.getId(pt.WrkOutPlanId);
        const typeBody = await typeManager.get(pt.ExerciseTypeId);

        const plan = new PlanModel(planBody);
        const exerciseType = new ExerciseTypeModel(typeBody);

        const model = new WrkOutMachinePlanModel({
            "WrkOutPlan": plan.constructJson(),
            "ExerciseType": exerciseType.constructJson()
        });
        result.push(model.constructJson(model));
    }
    return result;
}

const getIdPlan = async (req,res,id) => {
    try{
        const planType = await wrkOutPlanTypeManager.getIdPlan(id);
        
        const result = await buildBody(planType);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getIdType = async (req,res,id) => {
    try{
        const planType = await wrkOutPlanTypeManager.getIdType(id);
        
        const result = await buildBody(planType);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;
        let response = {};

        if (body.ExerciseTypeIds){
            for(let exerciseTypeId of body.ExerciseTypeIds){
                const result = await wrkOutPlanTypeManager.post({
                        "WrkOutPlanId": body.WrkOutPlanId,
                        "ExerciseTypeId": exerciseTypeId
                    });
            }
            response = {
                "Status": `Created ${body.ExerciseTypeIds.length} plan type connection for the ${body.WrkOutPlanId}`
            };
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
    getIdType,
    post,
}