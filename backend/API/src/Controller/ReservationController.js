const reservationManager = require('../Managers/ReservationManager');
const userManager = require('../Managers/UserManager');
const UserModel = require('../ORM/Models/User');
const ReservationModel = require('../ORM/Models/Reservation');

const getId = async (req,res,id) => {
    try{
        const reservation = await reservationManager.getId(id);
        
        const customerData = await userManager.getId(reservation.CustomerId);
        const customer =  new UserModel(customerData);

        const model = new ReservationModel(reservation);
        model.customer = customer.constructJson();
        
        res.status(200).json(model.constructJson(reservation));
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getAll = async (req,res) => {
    try{
        const reservation = await reservationManager.getAll();
        
        const results = [];
        
        for (const b of reservation){
            const customerData = await userManager.getId(b.CustomerId);
            const customer =  new UserModel(customerData);

            const a = new ReservationModel(b);
            a.customer = customer.constructJson();

            results.push(a.constructJson(b));
        }

        res.status(200).json(results);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const post = async (req, res) => {
    try{
        const body = req.body;
        const result = await reservationManager.post(body);

        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getId,
    getAll,
    post,
}