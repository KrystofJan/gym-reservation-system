const PostModel = require('./PostModel');
const utils = require('../../utils/utils');

class ExerciseTypePostModel extends PostModel{
    /**
     * @param {Object} jsonData 
     */
    constructor(jsonData){
        super();
        this.ExerciseTypeName = jsonData.ExerciseTypeName;
        this.Category= jsonData.Category;
        this.BodyPart = jsonData.BodyPart;
    }

    /**
     * @returns {boolean}
     */
    isNull() {
        const obj =  utils.cleanObject(this);
        return (!obj); 
    }
} 

module.exports = ExerciseTypePostModel;