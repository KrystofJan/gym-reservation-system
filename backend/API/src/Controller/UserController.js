const userManager = require('../Managers/UserManager');
const UserModel = require('../ORM/Models/User');
const UserAuthModel = require('../ORM/Models/UserAuth');

const loginAuth = async (req, res) => {
    try{
        const userAuth = new UserAuthModel(req.body);
        
        let result = await userManager.getValueLogin(userAuth.loginOrEmail);
        
        if (result){
            result = await userManager.getValueEmail(userAuth.loginOrEmail);
        }
        const real_result = result[0];

        if (real_result.Password != userAuth.encodedPassword){
            throw {"status": "wrong password"};
        }
        res.status(200).json({"status":"Successfull login!"});
    }
    catch(err){
        res.status(500).json(err);
    }
}

const register = async (req, res) => {
    try{
        const body = req.body;
        const result = await userManager.register(body);

        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    loginAuth,
    register,
}