const mysql = require('mysql')

// 创建连接池
let pool  = mysql.createPool({
    host: '139.196.178.250', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: 'students', // 选择的库
    user: 'root', // 用户名
    password: 'App@10086' // 用户密码
})

function query(sql,callback){
    pool.getConnection((err,connection)=>{
        connection.query(sql, (err,rows) =>{
            callback(err,rows)
            connection.release()
        })
    })
}

exports.query = query