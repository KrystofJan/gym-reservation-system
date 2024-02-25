const Model = require('./Model');

class MachineExerciseTypes extends Model{

    constructor(jsonData){
        super();
        this.exerciseType = jsonData.ExerciseType;
        this.machine = jsonData.WrkOutMachine;
    }

    constructJson(){
        return {
            "ExerciseType": this.exerciseType,
            "WrkOutMachine": this.machine,
        }
    }
}

module.exports = MachineExerciseTypes;
