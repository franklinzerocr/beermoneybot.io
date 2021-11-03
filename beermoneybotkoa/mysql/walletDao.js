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

class walletDao {
    constructor () {

    }

  getWalletById(idUser){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from wallet_address where FK_USER=?',idUser, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          console.log('getWalletById: ', results[0]);
      });
    })
  };

}

module.exports = new walletDao()
