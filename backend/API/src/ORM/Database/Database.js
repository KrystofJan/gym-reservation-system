const mysql = require('mysql2');
const apiLogger = require('../../ApiLoggerLogic/ApiLogger');
const Validators = require('./DatabaseValidators');
const dbKeys = require('./keys/table-keys.json');
const config = require('../../Config/config.json');
const dbInserts = require ('./keys/table-inserts.json');

class DatabaseHandler{
    constructor(){
        this.db = mysql.createConnection(config.Database);
    }
    
    dbConnect(){
        this.db.connect((err) => {
            if(err){
                apiLogger.logApi("an error occured while trying to connect to the database!\nError: "+ err);
            }
        });
    }
    dbDisconnect(){
        this.db.end((err) => {
            if(err){
                apiLogger.logApi("an error occured while trying to disconnectiong to the database!\nError: "+ err);
            }
        });
    }

    dbSelectAll(tableName){
        return new Promise((resolve, reject) => {
            const command = `SELECT * FROM ${tableName}`;

            this.db.query(command, (err, results) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  apiLogger.logApi(err);
                  // res.status(500).json({ error: 'Internal Server Error' }); // move to controller
                  return reject({ error: 'Internal Server Error, check the logger for more context' });
                }
    
                // res.json(results); // move to controller
            
                apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
                resolve(results);
            });
        })
        
    }

    dbPost(body, tableName){
        return new Promise((resolve, reject) => {
            const data = [];
            const columns = Object.keys(body).join(', ');
            const placeholders = Object.keys(body).map(() => '?').join(', ');
    
            Object.keys(body).forEach(function(key) {
                data.push(body[key]);
            });
    
            const command = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    
            this.db.query(command, data, (err, results) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  apiLogger.logApi(err);
                  return reject({ error: 'Internal Server Error, check the logger for more context' });
                }
                apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
                resolve({
                    "Status": `Successfull post on ${tableName} endpoint`,
                    "CreatedId": results.insertId
                });
            });
        });
    }

    dbSelectAttrIs(attrValue, attrName, tableName){
        return new Promise((resolve, reject) => {
            const command = `Select * from ${tableName} where ${attrName} = '${attrValue}'`;

            this.db.query(command, (err, results) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    apiLogger.logApi(err);
                    reject({ error: 'Internal Server Error' });
                  }
  
                  apiLogger.logApi("Get request on the " + tableName +" endpoint was Successfull!");
                  resolve(results);
            })
        });
    }

    dbSelectSpecific(id, tableName){
        console.log(id);
        return new Promise((resolve, reject) => {
            const pkey = dbKeys[tableName];
            const tableNames = tableName.split('--');
            tableName = tableNames[0];

            if(!Validators.validateNumericId(id)){
                console.error('Cannot use this ID', id);
                apiLogger.logApi("Cannot use this"+ pkey + " ! --" + id);
                reject({ error: 'Cannot pass in id that\'s not a number! Id: '+ id });
            }

            const command = `SELECT * FROM ${tableName} WHERE ${pkey} = ${id}`
    
            this.db.query(command, (err, results) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  apiLogger.logApi(err);
                  reject({ error: 'Internal Server Error' });
                }

                apiLogger.logApi("Get request on the " + tableName +" endpoint was Successfull!");
                resolve(results);
            });
            
        })
    }


    dbSelectOccupiedMachineAmount(id, time, date){
        return new Promise ( (resolve, reject) => {
            const pkey = dbKeys["WrkOutPlanMachines--plan"];

            if(!Validators.validateNumericId(id)){
                console.error('Cannot use this ID', id);
                apiLogger.logApi("Cannot use this"+ pkey + " ! --" + id);
                reject({ error: 'Cannot pass in id that\'s not a number! Id: '+ id });
            }
            this.db.query(
            "select count(*) as count "+
            "from WrkOutPlanMachines inner join Reservation on Reservation.WrkOutPlanId = WrkOutPlanMachines.WrkOutPlanId "+
            "where ('" + time + "' between WrkOutStartTime and WrkOutEndTime) and Date(ReservationTime) = '" + date + "' " +
            "and WrkOutPlanMachines.WrkOutMachineId = " + id + " and WrkOutPlanMachines.canDisturb = 1"
            ,(err, results) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  apiLogger.logApi(err);
                  reject({ error: 'Internal Server Error' });
                }
    
                apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
                resolve(results);
            });
        });            
    }


    dbRecommendMachine(id){
        return new Promise ( (resolve, reject) => {
            const pkey = dbKeys["WrkOutMachine"];

            if(!Validators.validateNumericId(id)){
                console.error('Cannot use this ID', id);
                apiLogger.logApi("Cannot use this"+ pkey + " ! --" + id);
                reject({ error: 'Cannot pass in id that\'s not a number! Id: '+ id });
            }
            this.db.query(
            'SELECT wm.WrkOutMachineId, wm.MachineName, ET.ExerciseTypeName, ET.BodyPart, wm.PopularityScore '+
            'FROM WrkOutMachine wm inner join MachineExerciseTypes met on wm.WrkOutMachineId = met.WrkOutMachineId ' +         
            'inner join ExerciseType ET on met.ExerciseTypeId = ET.ExerciseTypeId ' +
            'Where ET.BodyPart in ( ' +
                'select  DISTINCT BodyPart '+
                'from MachineExerciseTypes met inner join ExerciseType ET on met.ExerciseTypeId = ET.ExerciseTypeId '+
                'where met.WrkOutMachineId = ' + id +') ' +
            'and ET.Category in ( ' +
                'select Category '+
                'From MachineExerciseTypes met inner join ExerciseType ET on met.ExerciseTypeId = ET.ExerciseTypeId '+
                'Where met.WrkOutMachineId = ' + id + ') '+
            'and wm.WrkOutMachineId != ' + id + ' ' +
            'order by wm.PopularityScore desc ' +
            'LIMIT 5'
            ,(err, results) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  apiLogger.logApi(err);
                  reject({ error: 'Internal Server Error' });
                }
    
                apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
                resolve(results);
            });
        });            
    }
}
module.exports = DatabaseHandler;
