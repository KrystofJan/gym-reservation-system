const wrkOutMachineService = require('../Services/WrkOutMachineService');
const wrkOutMachineModel = require('../ORM/Models/WrkOutMachine');

const getAll = async (req, res) => {
    try{
        const body = await wrkOutMachineService.getAll();

        // validate...
        const results = [];

        for (const b of body){
            const a = new wrkOutMachineModel();

            a.constructFromJson(b);

            results.push(a.constructJson());
        }
        
        res.status(200).json(results);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getId = async (req,res,id) => {
    try{
        const body = await wrkOutMachineService.getId(id);
        
        const model = new wrkOutMachineModel();   
        
        model.constructFromJson(body);
        
        res.status(200).json(model.constructJson());
    }
    catch(err){
        res.status(500).json(err);
    }
}


const recommendMachine = async (req,res,id) => {
    try{
        const body = await wrkOutMachineService.recommendMachine(id);

        const result = [];
        for (const b of body){
            const model = new wrkOutMachineModel();    
            model.constructFromJson(b);
            result.push(model.constructJsonForRecommend()); 
        }

        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    getId,
    recommendMachine,
}