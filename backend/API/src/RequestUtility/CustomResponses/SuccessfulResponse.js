const Response = require('./Response');

class SuccessfulResponse extends Response {

    /**
     * 
     * @param {Object | Array} body 
     */
    constructor(body){
        super(200,body);
    }
}

module.exports = SuccessfulResponse;