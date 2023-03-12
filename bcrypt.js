const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env['host'],
    user: process.env['user'],
    password:process.env['password'],
    database: process.env['database'],
});
function getPool() {
    return pool;
}

async function query(sql) {
  var results;
  await pool.promise().query(sql).then((res, err) => { if (err) throw new Error(err); results = res });
  return results[0];
}

module.exports ={
  getPool:getPool, 
  query: query
}