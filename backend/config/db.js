const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'bubbli_clients',
  password: 'BUBBLI!@20_25_Local',
  database: 'bubbli_orgdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
