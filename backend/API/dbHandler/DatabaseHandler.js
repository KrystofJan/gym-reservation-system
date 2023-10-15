const mysql = require('mysql2');
const apiLogger = require('../ApiLoggerLogic/ApiLogger');

class DatabaseHandler{
    constructor(){
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'Kratos',
          });
    }
    dbConnect(){
        this.db.connect((err) => {
            if(err){
                apiLogger.logApi("an error occured while trying to connect to the database!\nError: "+ err);
            }
            apiLogger.logApi('Connected to the MySQL database');
        });
    }

    dbSelect(res, endpoint, cols){
        /*
        A Method for generic select.

        Args:
            res: Api response
            endpoint (string): A name of a table we want to make the query on.
            cols (array): Array of strings containing columns we want to select
            limit (int): Limit of things we want to display.
            where (str): Where clause in sql
        */
        columns = "";
        for(i = 0; i < cols.length; i++){
            columns += (i != cols.length-1 )? cols[i] + ", ":cols[i];
            
            apiLogger.logApi(columns);
        }
        
        this.db.query('SELECT ' + columns + ' FROM ' + endpoint + "LIMIT 20", (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              apiLogger.logApi(err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }

            res.json(results);
            console.log(handler.dbSelectALlReservations());
            apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
        });
    }

    dbSelect(res, endpoint, cols, where){
        /*
        A Method for generic select.

        Args:
            res: Api response
            endpoint (string): A name of a table we want to make the query on.
            cols (array): Array of strings containing columns we want to select.
            limit (int): Limit of things we want to display.
            where (str): Where clause in sql
        */
        columns = "";
        for(i = 0; i < cols.length; i++){
            columns += (i != cols.length-1 )? cols[i] + ", ":cols[i];
        }
        
        this.db.query('SELECT ' + columns + ' FROM ' + endpoint + 'Where ' + where  + "LIMIT 20", (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              apiLogger.logApi(err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }

            res.json(results);
            console.log(handler.dbSelectALlReservations());
            apiLogger.logApi("Get request on the Reservations endpoint was Successfull!");
        });
    }

}
module.exports = DatabaseHandler;