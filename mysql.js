var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test"
});

connection.connect();

let selectSql = "select * from user";
// 新增的 SQL 语句及新增的字段信息
// let updateSql = "UPDATE user SET name = ?,age = ? WHERE Id = ?";
// let updateSqlParams = ["sss", "23", 1];

// 连接 SQL 并实施语句
connection.query(selectSql, function(err, res) {
  if (err) {
    console.log("查詢错误：");
    console.log(err);
    return;
  } else {
    console.log("查詢成功：");
    console.log(JSON.stringify(res));
  }
});

connection.end();
