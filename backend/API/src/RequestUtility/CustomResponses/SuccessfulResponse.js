const BaseResponse = require('./BaseResponse');

class SuccessfulResponse extends BaseResponse {

    /**
     * 
     * @param {Object | Array} body 
     */
    constructor(body){
        super(200,body);
    }
}

module.exports = SuccessfulResponse;