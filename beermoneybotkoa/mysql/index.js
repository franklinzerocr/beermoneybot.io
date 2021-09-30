var mysql = require('mysql');
var config = require('./config.js')

const connection = mysql.createConnection({
  host     : config.database.HOST,
  user     : config.database.USER,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port: config.database.PORT
});

class Mysql {
    constructor () {

    }
    allUsers() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * from users', function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            console.log('The solution is: ', results[0]);
        });
      })

    };

    byUsername(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT Username from users', function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results[0])
          console.log('The username is: ', results[0]);
      });
    })
  };
  
}

module.exports = new Mysql()
