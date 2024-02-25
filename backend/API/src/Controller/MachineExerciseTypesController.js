const machineExerciseTypesManager = require('../Managers/MachineExerciseTypesManager');
const machineManager = require('../Managers/WrkOutMachineManager');
const MachineModel = require('../ORM/Models/WrkOutMachine');
const ExerciseTypeModel = require('../ORM/Models/ExerciseType');
const typeManager = require('../Managers//ExerciseTypeManager');
const MachineExerciseTypesModel = require('../ORM/Models/MachineExerciseTypes');

const buildBody = async (machineType) => {
    const result = [];

    for(const mt of machineType){
            
        const machineBody = await machineManager.getId(mt.WrkOutMachineId);
        const typeBody = await typeManager.get(mt.ExerciseTypeId);

        const machine = new MachineModel(machineBody);
        const exerciseType = new ExerciseTypeModel(typeBody);

        const model = new MachineExerciseTypesModel({
            "WrkOutMachine": machine.constructJson(),
            "ExerciseType": exerciseType.constructJson()
        });
        result.push(model.constructJson(model));
    }
    return result;
}

const getIdMachine = async (req,res,id) => {
    try{
        const machineType = await machineExerciseTypesManager.getIdMachine(id);

        const result = await buildBody(machineType);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getIdType = async (req,res,id) => {
    try{
        const machineType = await machineExerciseTypesManager.getIdType(id);

        const result = await buildBody(machineType);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;
        const result = await machineExerciseTypesManager.post(body);

        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getIdMachine,
    getIdType,
    post,
}