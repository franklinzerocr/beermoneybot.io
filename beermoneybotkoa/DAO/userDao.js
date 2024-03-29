var mysql = require('mysql');
var {CONNECTION} = require('../DAO/index');
require('dotenv/config')

class userDao {
    constructor () {

    }

    allUsers() {
      return new Promise((resolve, reject) => {
        CONNECTION.query('SELECT * from users', function (error, results, fields) {
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
      CONNECTION.query('SELECT * from users where ID=?',idUser, function (error, results, fields) {
          if (error) {
              throw error
          };
          if(results.length == 1){
          resolve(results[0])
        }
          else {
            resolve(null)
          }
          console.log('getById: ', results[0]);
      });
    })
  };

  login(username, password){
  return new Promise((resolve, reject) => {
    var sql= 'SELECT * FROM users WHERE Email =? and Password=?';
    CONNECTION.query(sql,[username,password], function (error, results, fields) {
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
      CONNECTION.query('SELECT * from users', function (error, results, fields) {
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
    CONNECTION.query('SELECT Email from users where Email=?',email, function (error, results, fields) {
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
  CONNECTION.query('SELECT ID, Password from users where Email=?',email, function (error, results, fields) {
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
      CONNECTION.query(sql,[t_userid,username,id], function (error, results, fields) {
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
      CONNECTION.query(sql,[username, email, password, 'prueba'], function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
          console.log('Register: ', results[0]);
      });
    })
  };
}

module.exports = new userDao()
