const wrkOutPlanManager = require('../Managers/WrkOutPlanManager');
const userManager = require('../Managers/UserManager');
const WrkOutPlanModel = require('../ORM/Models/WrkOutPlan');
const UserModel = require('../ORM/Models/User');

const getId = async (req,res,id) => { // getOne
    try{ // Tohle cele do Managera
        const wrkOutPlan = await wrkOutPlanManager.getId(id); // manager // getById

        const customerData = await userManager.getId(wrkOutPlan.UserId);
        const customer = new UserModel(customerData);

        const model = new WrkOutPlanModel(wrkOutPlan);
        model.user = customer.constructJson();
        
        res.status(200).json(model.constructJson(wrkOutPlan));
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getAll = async (req,res) => {

    try{
        const wrkOutPlan = await wrkOutPlanManager.getAll();
        
        const results = [];
        
        for (const b of wrkOutPlan){
            const a = new WrkOutPlanModel(b);
            const userData = await userManager.getId(b.UserId);
            
            const user =  new UserModel(userData);
            a.user = user.constructJson();

            results.push(a.constructJson(b));
        }

        res.status(200).json(results);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;

        if (Array.isArray(body)){
            const ids = []
            for (const record of body){
                const result = await wrkOutPlanManager.post(record);
                ids.push(result.CreatedId);
            }
            
            res.status(201).json({
                "status": `Created ${ids.length}`,
                "CreatedIds": ids
            });
        }
        else{
            const result = await wrkOutPlanManager.post(body);
            res.status(201).json(result);
        }
    }
    catch(err) {
        res.status(500).json(err);
    }

} 

module.exports = {
    getId,
    getAll,
    post,
}