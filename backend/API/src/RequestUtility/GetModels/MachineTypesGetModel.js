const ExerciseType = require("../../ORM/Models/ExerciseType");
const WrkOutMachine = require("../../ORM/Models/WrkOutMachine");

class MachineTypesGetModel {

    /**
     * 
     * @param {WrkOutMachine} wrkOutMachine 
     * @param {ExerciseType} exerciseType 
     */
    constructor(wrkOutMachine, exerciseType){ // TODO refactor names!
        this.WrkOutMachine = wrkOutMachine;
        this.ExerciseType = exerciseType;
    }
}

module.exports = MachineTypesGetModel;