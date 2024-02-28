const machineExerciseTypesManager = require('../Managers/MachineExerciseTypesManager');
const BadRequestResponse = require('../RequestUtility/CustomResponses/BadRequestResponse');
const MachineTypesPostModel = require('../RequestUtility/PostModels/MachineTypesPostModel');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Number} id 
 */
const getIdMachine = async (req,res,id) => {
    const response = await machineExerciseTypesManager.getIdMachine(id);
    res.status(response.statusCode).json(response.responseBody);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Number} id 
 */
const getIdType = async (req,res,id) => {
    console.log(id);
    if(typeof id === "number"){

    }
    const response = await machineExerciseTypesManager.getIdType(id);

    if(response.statusCode == 200 && (response.responseBody == {} || response.responseBody == [])){

        const customResponse = new BadRequestResponse("No")
    }

    res.status(response.statusCode).json(response.responseBody);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const post = async (req, res) => {
    const machineTypesPostModel = new MachineTypesPostModel(req.body);

    if (machineTypesPostModel.isNull()){
        const response = new BadRequestResponse("Wrong request body");
        res.status(response.statusCode).json(response.responseBody);
        return;
    }
    
    const response = await exerciseTypeManager.post(machineTypesPostModel);
    res.status(response.statusCode).json(response.responseBody);
}

module.exports = {
    getIdMachine,
    getIdType,
    post,
}