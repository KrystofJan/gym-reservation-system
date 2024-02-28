const exerciseTypeManager = require('../Managers/ExerciseTypeManager');
const ExerciseTypePostModel = require('../RequestUtility/PostModels/ExerciseTypePostModel');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getAll = async (req, res) => {
    const response = await exerciseTypeManager.getAll();
    res.status(response.statusCode).json(response.responseBody);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Number} id 
 */
const getId = async (req,res,id) =>{
    const response = await exerciseTypeManager.get(id);
    res.status(response.statusCode).json(response.responseBody);
} 

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const post = async (req, res) => {
    const exerciseTypePostModel = new ExerciseTypePostModel(req.body);

    if (exerciseTypePostModel.isNull()){
        const response = new BadRequestResponse("Wrong request body");
        res.status(response.statusCode).json(response.responseBody);
        return;
    }
    
    const response = await exerciseTypeManager.post(exerciseTypePostModel);
    res.status(response.statusCode).json(response.responseBody);
}

module.exports = {
    getAll,
    getId,
    post,
}