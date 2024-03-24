import { AddressDAO } from '../ORM/AccessModels/AddressDAO.js';
import { Address } from '../Models/Address.js'
import { Response } from '../utils/RequestUtility/CustomResponces/Response.js';
import { IDictionary } from '../utils/Utilities.js';
import { OkResponse } from '../utils/RequestUtility/CustomResponces/OkResponse.js';
import { CreatedResponse } from '../utils/RequestUtility/CustomResponces/CreatedResponse.js';
import { FailedResponse } from '../utils/RequestUtility/CustomResponces/FailedResponse.js';
import { DatabaseFail, DatabaseResponse, DatabaseSuccess } from '../Database/DatabaseResponse.js';

export const FindAllAdresses = async (): Promise<Response> => {
    try{
        const addressDAO = new AddressDAO();

        const body: Array<IDictionary<any>> = await addressDAO.SelectAllAdresses();
        
        let results: Array<Address> = new Array<Address>();

        for (const b of body){
            const a = new Address(b);
            results.push(a);
        }

        return new OkResponse("We good", results);
    }
    catch(err) {
        return new FailedResponse("Cannot get any of these things :(");
    }
}

export const FindAdressById = async (id: number): Promise<Response> => {
    try{
        const addressDAO = new AddressDAO();

        const body: IDictionary<any> = await addressDAO.SelectAdressById(id);
        
        let result: Address = new Address(body);

        return new OkResponse("We good", result);
    }
    catch(err) {
        return new FailedResponse("Cannot get any of these things :(");
    }
}

export const CreateAddress = async (body: Address) => { // create
    let result: DatabaseResponse;
    // TODO better response
    try{
        const addressDAO = new AddressDAO();
        result = await addressDAO.InsertAddress(body);
        const successResult = result as DatabaseSuccess;
        console.log('Bodiiii', result);
        return new CreatedResponse(
            "Successfully created an Address", 
            successResult.Body);
    }
    catch(err){
        return new FailedResponse('Sadge');
    }
}