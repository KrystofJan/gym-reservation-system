const Model = require('./Model');

class WrkOutMachine extends Model{

    constructor(jsonData){
        super();
        this.wrkOutMachineId = jsonData.WrkOutMachineId;
        this.machineName = jsonData.MachineName;
        this.maxWeight = (jsonData.MaxWeight != null)? jsonData.MaxWeight : 0;
        this.minWeight = (jsonData.MinWeight != null)? jsonData.MinWeight : 0;
        this.maxPeople = jsonData.MaxPeople;
        this.avgTimeTaken = jsonData.AvgTimeTaken;
        this.popularityScore = jsonData.PopularityScore;
        this.exerciseTypeName = (jsonData.ExerciseTypeName != null) ? jsonData.ExerciseTypeName : ""
        this.bodyPart = (jsonData.BodyPart != null) ? jsonData.BodyPart : ""
    }

    constructJson(){
        return{
            "WrkOutMachineId": this.wrkOutMachineId,
            "MachineName": this.machineName,
            "MaxWeight": this.maxWeight,
            "MinWeight": this.minWeight,
            "MaxPeople": this.maxPeople,
            "AvgTimeTaken": this.avgTimeTaken,
            "PopularityScore": this.popularityScore
        }
    }
}
module.exports = WrkOutMachine;