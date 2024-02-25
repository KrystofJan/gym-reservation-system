const PostModel = require('./PostModel');
const utils = require('../../utils/utils');

class AddressPostModel extends PostModel{
    constructor(jsonData){
        this.Street = jsonData.Street;
        this.City = jsonData.City;
        this.PostalCode = jsonData.PostalCode;
        this.Country = jsonData.Country;
        this.BuildingNumber = jsonData.BuildingNumber;
        this.ApartmentNumber = jsonData.ApartmentNumber;
    }

    /**
     * 
     * @returns {boolean}
     */
    isNull() {
        const obj =  utils.cleanObject(this);
        return (!obj); 
    }
} 
module.exports = AddressPostModel;