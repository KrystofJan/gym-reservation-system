import { IDictionary } from "../../utils/Utilities.js";
import { RelationalModel } from "./RelationalModel.js";
import { TableTypes } from "../Database/TableTypes.js";
import { Address } from '../Models/Address.js'
import { DatabaseFail, DatabaseResponse } from "../Database/DatabaseResponse.js";

export class AddressDAO extends RelationalModel{

    async SelectAllAdresses(){
        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectAll(TableTypes.Address)
            );
            return result.Body;            
        }
        catch(err){        
            console.error(err);
        }
    }

    async SelectAdressById(id: number): Promise<DatabaseResponse>{
        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectSpecific(id,TableTypes.Address)
            );
            return result.Body[0];            
        }
        catch(err){        
            console.error(err);
            return new DatabaseFail("Whoops");
        }
    }

    async InsertAddress (body: Address){
        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbPost(body, TableTypes.Address)
            );
            return result;
        }        
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }
}
