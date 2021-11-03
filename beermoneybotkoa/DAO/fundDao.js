var mysql = require('mysql');
var {CONNECTION} = require('../DAO/index');
require('dotenv/config')

class fundDao {
    constructor () {

    }

    getFundById(id){
      return new Promise((resolve, reject) => {
        CONNECTION.query('SELECT * from funds where ID=?',id, function (error, results, fields) {
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
