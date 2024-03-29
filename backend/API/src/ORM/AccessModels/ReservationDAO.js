const RelationalModel = require('./RelationalModel');
const User = require('../Models/User');
const UserDAO = require('./UserDAO');

class ReservationDAO extends RelationalModel{

    async getId(id){

        try{
            const result = await this.MakeDbRequest(() => this.dbHandler.dbSelectSpecific(id,"Reservation"));
            return result[0];
        }
        catch(error){
            const err = await error.json();
            console.log("Nastala chyba: " + err);
        }
    }

    async getAll(id){
        try{
            const result = await this.MakeDbRequest(() => this.dbHandler.dbSelectAll("Reservation"));
            return result;
        }
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }

    async post(body){
        try{
            let result;

            if(body.TrainerId){
                result = await this.MakeDbRequest(() => this.dbHandler.dbPost(body,"Reservation-trainer"));
            }
            result = await this.MakeDbRequest(() => this.dbHandler.dbPost(body,"Reservation"));
            
            return result;
        }
        catch(error){
            console.log("Nastala chyba: " + error);
        }
    }
}

module.exports = ReservationDAO;