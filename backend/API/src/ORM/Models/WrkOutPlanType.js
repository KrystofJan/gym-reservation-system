const User = require('./User');
const Model = require('./Model');

class WrkOutPlan extends Model{

    constructor(jsonData){
        super();
        this.wrkOutPlan = jsonData.WrkOutPlan;
        this.exerciseType = jsonData.ExerciseType;
    }

    constructJson(){
        return{
            "WrkOutPlan": this.wrkOutPlan,
            "ExerciseType": this.exerciseType,
        }
    }
}
 
module.exports = WrkOutPlan;