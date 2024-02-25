const Machine = require('./WrkOutMachine');

class RecommendMachine extends Machine {
    constructor(jsonData){
        super(jsonData);
    }

    constructJson(){
        return {
            "WrkOutMachineId": this.wrkOutMachineId,
            "MachineName": this.machineName,
            "PopularityScore": this.popularityScore,
            "ExerciseTypeName": this.exerciseTypeName,
            "BodyPart": this.bodyPart
        }
    }

}
module.exports = RecommendMachine;