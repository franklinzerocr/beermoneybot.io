var mysql = require('mysql');
require('dotenv/config')
require('../mysql/index')

const connection = mysql.createConnection({
  host     : process.env.HOST_DB,
  user     : process.env.USER_DB,
  password : process.env.PASSWORD_DB,
  database : process.env.DATABASE,
  port: process.env.PORT_DB
});

class fundDao {
    constructor () {

    }

    getFundById(id){
      return new Promise((resolve, reject) => {
        connection.query('SELECT * from funds where ID=?',id, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            console.log('getFundById: ', results[0]);
        });
      })
    };

}

module.exports = new fundDao()
