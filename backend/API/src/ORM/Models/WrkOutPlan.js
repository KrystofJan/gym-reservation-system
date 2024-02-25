const User = require('./User');
const Model = require('./Model');

class WrkOutPlan extends Model{

    constructor(jsonData){
        super();
        this.wrkOutPlanId = jsonData.WrkOutPlanId;
        this.planName = jsonData.PlanName;
        this.user = jsonData.User;
    }

    constructJson(){
        return{
            "WrkOutPlanId": this.wrkOutPlanId,
            "PlanName": this.planName,
            "User": this.user
        }
    }
}

module.exports = WrkOutPlan;