const RelationalModel = require('./RelationalModel');

class WrkOutPlanTypeDAO extends RelationalModel{

    /**
     * @param {Number} id 
     */
    async getIdPlan(id){

        try{
            const result = await this.MakeDbRequest(() => this.dbHandler.dbSelectSpecific(id,"WrkOutPlanType--plan"));

            return result;
        }
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }
    
    /**
     * @param {Number} id 
     */
    async getIdType(id){

        try{
            const result = await this.MakeDbRequest(() => this.dbHandler.dbSelectSpecific(id,"WrkOutPlanType--type"));

            return result;
        }
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }

    /**
     * @param {*} body // TODO
     */
    async post (body){
        try{
            const result = await this.MakeDbRequest(() => this.dbHandler.dbPost(body, "WrkOutPlanType"));
            return result;
        }        
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }
}

module.exports = WrkOutPlanTypeDAO;
