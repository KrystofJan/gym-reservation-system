const exerciseTypeManager = require('../Managers/ExerciseTypeManager');
const ExerciseTypeModel = require('../ORM/Models/ExerciseType');

const getAll = async (req, res) => {
    try{
        const body = await exerciseTypeManager.getAll();
        
        // validate...
        const results = [];
        
        for (const b of body){
            const a = new ExerciseTypeModel(b);

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
        const body = await exerciseTypeManager.get(id);
        
        const model = new ExerciseTypeModel(body);

        res.status(200).json(model.constructJson());
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;
        const result = await exerciseTypeManager.post(body);

        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    getId,
    post,
}