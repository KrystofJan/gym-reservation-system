class BaseResponse {
    
    /**
     * @param {Number} status_code 
     * @param {Object} response_body 
     */
    constructor(status_code, response_body){
        this.statusCode = status_code;
        this.responseBody = response_body;
    }
}

module.exports = BaseResponse;