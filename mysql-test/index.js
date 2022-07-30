const mysql = require('mysql') 


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2022',
    port: '3306',
    database: 'myblog' // 用这个数据库
})

// 开始连接
con.connect();

// 执行 sql 语句
const sql = 'select * from users;'

con.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(result);
})

// 关闭连接
con.end;