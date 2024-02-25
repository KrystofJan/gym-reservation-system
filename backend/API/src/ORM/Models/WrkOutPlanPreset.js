const User = require('./User');
const Model = require('./Model');

class WrkOutPlan extends Model{

    constructor(jsonData){
        super();
        this.wrkOutPlanPresetId = jsonData.WrkOutPlanPresetId;
        this.presetName = jsonData.PresetName;
        this.author = jsonData.User;
    }

    constructJson(){
        return{
            "WrkOutPlanPresetId": this.wrkOutPlanPresetId,
            "PresetName": this.presetName,
            "Author": this.author
        }
    }
}

module.exports = WrkOutPlan;