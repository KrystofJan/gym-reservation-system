const BaseResponse = require('./BaseResponse');

class BadRequestResponse extends BaseResponse {

    /**
     * 
     * @param {String} message 
     */
    constructor(message){
        super(400, {
            "status": "error",
            "message": message
        });
    }
}

module.exports = BadRequestResponse;