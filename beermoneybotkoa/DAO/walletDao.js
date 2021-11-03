var mysql = require('mysql');
var {CONNECTION} = require('../DAO/index');
require('dotenv/config')

class walletDao {
    constructor () {

    }

  getWalletById(idUser){
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from wallet_address where FK_USER=?',idUser, function (error, results, fields) {
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
