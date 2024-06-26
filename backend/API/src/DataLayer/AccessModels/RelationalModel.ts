import { IDictionary } from '../../utils/Utilities.js';
import { Database } from '../Database/Database.js';
import { DatabaseFail, DatabaseResponse, DatabaseSuccess } from '../Database/DatabaseResponse.js';
import { TableTypes } from "../Database/TableTypes.js";
import { Model } from '../../Models/Model.js';

export class RelationalModel{

    protected dbHandler: Database;
    protected TableType: TableTypes;

    constructor(tableType: TableTypes){
        this.dbHandler = new Database();
        this.TableType = tableType;
    }
    
    protected async MakeDbRequest(func: Function){
        this.dbHandler.dbConnect();
        const result = await func();
        this.dbHandler.dbDisconnect();
        return result;
    }

    protected async SecectByForeignId(id: number, foreignTableType: TableTypes){
        try{
            const result: DatabaseResponse = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectSpecific(id, this.TableType, foreignTableType)
            );
            
            if (result instanceof DatabaseSuccess){
                const successResult = result as DatabaseSuccess; 
                return successResult.Body;
            }         
        }
        catch(err){        
            if (err instanceof DatabaseFail){
                return err;
            }
            else{
                console.error(err);
                throw err;
            }
        }
    }

    protected async SelectAll() {
        try{
            const result: DatabaseResponse = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectAll(this.TableType)
            );
            
            if (result instanceof DatabaseSuccess){
                const successResult = result as DatabaseSuccess; 
                return successResult.Body;
            }         
        }
        catch(err){        
            if (err instanceof DatabaseFail){
                return err;
            }
            else{
                console.error(err);
                throw err;
            }
        }
    }

    protected async SelectById(id: number) {
        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectSpecific(id, this.TableType, null)
            );
            
            if (result instanceof DatabaseSuccess){
                const successResult = result as DatabaseSuccess; 
                return successResult.Body[0];
            }         
        }
        catch(err){        
            if (err instanceof DatabaseFail){
                return err;
            }
            else{
                console.error(err);
                throw err;
            }
        }
    }

    protected async SelectByAttr(attrName: string, attrValue: any){

        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbSelectAttrIs(attrValue, attrName, this.TableType)
            );

            if (result instanceof DatabaseSuccess){
                const successResult = result as DatabaseSuccess; 
                return successResult.Body;
            }         
        }
        catch(err){        
            if (err instanceof DatabaseFail){
                return err;
            }
            else{
                console.error(err);
                throw err;
            }
        }
    }

    protected async Insert (body: Model){
        try{
            const result = await this.MakeDbRequest(
                () => this.dbHandler.dbPost(body, this.TableType)
            );
            return result;
        }        
        catch(err){        
            if (err instanceof DatabaseFail){
                return err;
            }
            else{
                console.error(err);
                throw err;
            }
        }
    }
}

