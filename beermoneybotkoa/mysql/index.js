var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'beermoney_users',
  port:'8889'
});

connection.connect();

connection.query('SELECT * FROM users', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ');
});

connection.end();
