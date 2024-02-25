const Response = require('./Response');

class BadRequestResponse extends Response {

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