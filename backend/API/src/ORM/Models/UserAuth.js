const Model = require('./Model');

class UserAuth extends Model{
    constructor(jsonData){
        super();
        this.loginOrEmail = jsonData.LoginOrEmail;
        this.encodedPassword = (jsonData.EncodedPassword) ? jsonData.EncodedPassword : '';
    }
}

module.exports = UserAuth;