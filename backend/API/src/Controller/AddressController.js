const addressManager = require('../Managers/AddressManager');
const AddressModel = require('../ORM/Models/Address');
const BadRequestResponse = require('../RequestUtility/CustomResponses/BadRequestResponse');
const AddressPostModel = require('../RequestUtility/PostModels/AddressPostModel');

const getAll = async (req, res) => {
    const response = await addressManager.getAll();
    res.status(response.statusCode).json(response.responseBody);
}

const getId = async (req,res,id) => {
    const response = await addressManager.getId(id);
    res.status(response.statusCode).json(response.responseBody);
}


const post = async (req, res) => {
    const addressPostModel = new AddressPostModel(req.body);

    if (addressPostModel.isNull()){
        const response = new BadRequestResponse("Wrong request body");
        res.status(response.statusCode).json(response.responseBody);
        return;
    }
    
    const response = await addressManager.post(addressPostModel);
    res.status(response.statusCode).json(response.responseBody);
}

module.exports = {
    getAll,
    getId,
    post,
}