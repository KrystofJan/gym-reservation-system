import fs from 'fs';

export class ApiLogger {

  static logApi(msg: string){
    const date = new Date();
  
    let return_message = "[" + date.toString() + "] - " + msg + "\n"; 
  
      fs.appendFile('../../Logs/APIlog.txt', return_message, err => {
          if (err) {
            console.error(err);
          }
        });
  }
  
  static logApiSuccess(msg: string){
    const date = new Date();
  
    let return_message = "[" + date.toString() + "] - " + msg + "\n"; 
  
      fs.appendFile('../../Logs/APIlog.txt', return_message, err => {
          if (err) {
            console.error(err);
          }
        });
  }
}
