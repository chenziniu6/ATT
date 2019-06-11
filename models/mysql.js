const mysql   = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'card'//数据库名为user 表名为user
});
 
connection.connect(err =>{
    if(err){
        console.error(`链接数据库失败:${err.message}`);
        process.exit(0)
      }
});

//暴露接口
module.exports = connection;