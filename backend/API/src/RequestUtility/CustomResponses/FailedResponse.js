const Response = require('./Response');

class FailedResponse extends Response {

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