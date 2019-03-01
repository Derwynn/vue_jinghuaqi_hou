// 创建数据库连接
const mysql = require('mysql');

let pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:3306,
    database:'mfresh',
    connectionLimit:10
});
console.log('连接成功');
module.exports = pool;