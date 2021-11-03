var mysql = require('mysql');
var {CONNECTION} = require('../DAO/index');
require('dotenv/config')

class operationDao {
    constructor () {

    }

    getOperationByIdUser(idUser){
      return new Promise((resolve, reject) => {
        CONNECTION.query('SELECT * from operations where FK_USER=?',idUser, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            console.log('getoperationByIdUser: ', results[0]);
        });
      })
    };

}

module.exports = new operationDao()
