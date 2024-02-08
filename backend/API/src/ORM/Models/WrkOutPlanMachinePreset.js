class WrkOutPlanMachinePreset{

    constructor(jsonData){
        console.log("asdasdasdasd");
        this.wrkOutPlanPreset = jsonData.WrkOutPlanPreset ? jsonData.WrkOutPlanPreset:null;
        this.wrkOutMachine = jsonData.WrkOutMachine;
        this.sets = jsonData.sets;
        this.reps = jsonData.reps;
    }

    constructJson(){
        return{
            "WrkOutPlanPreset": this.wrkOutPlanPreset,
            "WrkOutMachine": this.wrkOutMachine,
            "Sets": this.sets,
            "Reps": this.reps
        }
    }

    constructJsonForPlanPreset(){
        return{
            "WrkOutMachine": this.wrkOutMachine,
            "Sets": this.sets,
            "Reps": this.reps
        }
    }
}

module.exports = WrkOutPlanMachinePreset;
