const BaseResponse = require('./BaseResponse');

class FailedResponse extends BaseResponse {

    /**
     * 
     * @param {String} message 
     */
    constructor(message){
        super(500, {
            "status": "error",
            "message": message
        });
    }
}

module.exports = FailedResponse;