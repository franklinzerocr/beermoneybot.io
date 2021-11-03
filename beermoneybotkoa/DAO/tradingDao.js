var mysql = require('mysql');
var {CONNECTION} = require('../DAO/index');
require('dotenv/config')

class tradingDao {
    constructor () {

    }

    getTradingPoolById(id){
      return new Promise((resolve, reject) => {
        CONNECTION.query('SELECT * from trading_pool where ID=?',id, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            console.log('getTradingPoolById: ', results[0]);
        });
      })
    };
}

module.exports = new tradingDao()
