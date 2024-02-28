
const PostModel = require('./PostModel');
const utils = require('../../utils/utils');

class MachineTypesPostModel extends PostModel{
    /**
     * @param {Object} jsonData 
     */
    constructor(jsonData){
        super();
        this.WkrOutMachineId = jsonData.WkrOutMachineId;
        this.ExerciseTypeId = jsonData.ExerciseTypeId;
    }

    /**
     * @returns {boolean}
     */
    isNull() {
        const obj =  utils.cleanObject(this);
        return (!obj); 
    }
} 

module.exports = MachineTypesPostModel;