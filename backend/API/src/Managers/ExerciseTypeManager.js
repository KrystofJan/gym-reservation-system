const ExerciseTypeDAO = require('../ORM/AccessModels/ExerciseTypeDAO');
const FailedResponse = require('../RequestUtility/CustomResponses/FailedResponse');
const SuccessfulResponse = require('../RequestUtility/CustomResponses/SuccessfulResponse');
const ExerciseTypeModel = require('../ORM/Models/ExerciseType');

const getAll = async () => {

    try{
        const exerciseTypeDAO = new ExerciseTypeDAO(); 
        const body = await exerciseTypeDAO.getAll();
        
        // validate...
        const results = [];
        
        for (const b of body){
            const a = new ExerciseTypeModel(b);

            results.push(a.constructJson());
        }
       
        return new SuccessfulResponse(results);
    }
    catch(err){
        return new FailedResponse(err);
    }
}

const get = async (id) => {
    try{
        const exerciseTypeDAO = new ExerciseTypeDAO(); 
        console.log('hey');
        const body = await exerciseTypeDAO.get(id);
        
        const model = new ExerciseTypeModel(body);
        
        return new SuccessfulResponse(model.constructJson());
    }
    catch(err){
        return new FailedResponse(err);
    }
}

const post = async (body) => {
    try{
        const exerciseTypeDAO = new ExerciseTypeDAO(); 
        const result = await exerciseTypeDAO.post(body);
        
        return new SuccessfulResponse(result);
    } catch(err) {
        return new FailedResponse(err);
    }
}

module.exports = {
    getAll,
    get,
    post,
}
