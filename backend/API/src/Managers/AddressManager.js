const AddressDAO = require('../ORM/AccessModels/AddressDAO');
const SuccessfulResponse = require('../RequestUtility/CustomResponses/SuccessfulResponse');
const FailedResponse = require('../RequestUtility/CustomResponses/FailedResponse');;
const AddressModel = require('../ORM/Models/Address');

const getAll = async () => {
    try{
        const addressDAO = new AddressDAO();

        const body = await addressDAO.getAll();
        
        // validate...
        const results = [];
        
        for (const b of body){
            const a = new AddressModel(b);
            results.push(a.constructJson());
        }
        
        return new SuccessfulResponse(results);
    }
    catch(err){
        return new FailedResponse(err);
    }
}

const get = async (id) => {
    try{
        const addressDAO = new AddressDAO();
        const address = await addressDAO.get(id);
        
        const model = new AddressModel(address);

        return new SuccessfulResponse(model.constructJson(address));
    }
    catch(err){
        return new FailedResponse(err);
    }

}

const post = async (body) => {
    try{
        const addressDAO = new AddressDAO();
        const result = await addressDAO.post(body);

        return new SuccessfulResponse(result);
    }
    catch(err){
        return new FailedResponse(err);
    }
}

module.exports = {
    getAll,
    get,
    post,
}
