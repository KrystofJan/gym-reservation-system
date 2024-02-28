const BaseResponse = require('./BaseResponse');

class NotFoundresponse extends BaseResponse {

    /**
     * 
     * @param {String} message 
     */
    constructor(message){
        super(404,{"status": "error", "message": message});
    }
}

module.exports = NotFoundresponse;