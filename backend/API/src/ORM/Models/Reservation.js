const User = require('./User');
const Model = require('./Model');

class Reservation extends Model {

    constructor(jsonData){
        super();
        this.reservationId = jsonData.ReservetionId;
        this.ammountOfPeople = jsonData.AmmoutOfPeople;
        this.reservationTime = jsonData.ReservationTime;
        this.customer = jsonData.Customer;
        this.trainer = jsonData.TrainerId;
        this.wrkOutPlan = jsonData.WrkOutPlanId;
    }

    constructJson(){

        return{
            "ReservationId": this.reservationId,
            "AmmoutOfPeople": this.ammountOfPeople,
            "ReservationTime": this.reservationTime,
            "Customer": this.customer,
            "TrainerId": (this.trainer)?this.trainer:null,
            "WrkOutPlanId": this.wrkOutPlan
        }
    }
}
module.exports = Reservation;