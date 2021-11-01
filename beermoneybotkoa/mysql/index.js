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

    getById(idUser){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users where ID=?',idUser, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          console.log('getById: ', results[0]);
      });
    })
  };

  login(username, password){
  return new Promise((resolve, reject) => {
    var sql= 'SELECT * FROM users WHERE Email =? and Password=?';
    connection.query(sql,[username,password], function (error, results, fields) {
        if (error) {
            throw error
        };

        if(results.length == 1){
        resolve(results[0])
      }
        else {
          resolve(null)
        }
        console.log('Login: ', results[0]);
    });
  })
};

    byUsername(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users', function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results[0])
          console.log('The user is: ', results[0]);
      });
    })
  };

  getByEmail(email){
  return new Promise((resolve, reject) => {
    console.log(email)
    connection.query('SELECT Email from users where Email=?',email, function (error, results, fields) {
        if (error) {
            throw error
        };
        if(results.length > 0){
        resolve(results[0])
      }
        else {
          resolve(null)
        }
        console.log('Result byEmail: ', results[0]);
    });
  })
};

getPasswordByEmail(email){
return new Promise((resolve, reject) => {
  connection.query('SELECT ID, Password from users where Email=?',email, function (error, results, fields) {
      if (error) {
          throw error
      };
      if(results.length > 0){
      resolve(results[0])
    }
      else {
        console.log("entra ")
        resolve(null)
      }
  });
})
};

  update(t_userid,username,id){
    return new Promise((resolve, reject) => {
      var sql= 'UPDATE users set T_userid =? , Username=? where id =?';
      connection.query(sql,[t_userid,username,id], function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          console.log('update: ', results[0]);
      });
    })
  };

  register(username, email, password){
    return new Promise((resolve, reject) => {
      var sql= 'INSERT INTO users SET Username =? , Email=?, Password =?, T_userid=?';
      connection.query(sql,[username, email, password, 'prueba'], function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          console.log('Register: ', results[0]);
      });
    })
  };

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

module.exports = new Mysql()
