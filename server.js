var express = require("express");
var app = express();
var http = require("http").Server(app);
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test"
});

// 路由为/默认src静态文件夹
app.use("/", express.static(__dirname + "/src"));

connection.connect();
app.post("/register", function(req, res) {
  const data = req.query;
  const selectSql = `select * from user where name = '${data.name}'`;
  const insertSql = `insert into user (name, password) values (?,?)`;
  // 连接 SQL 并实施语句
  connection.query(selectSql, (err, result) => {
    if (err) {
      return;
    } else if (result.length === 0) {
      connection.query(
        insertSql,
        [`${data.name}`, `${data.password}`],
        (err, re) => {
          if (re) {
            res.send({ msg: "注册成功", code: 200 });
          }
        }
      );
    } else if (result.length !== 0) {
      res.send({ msg: "用户名已存在", code: 201 });
    }
  });
  // connection.end();
});

app.post("/login", function(req, res) {
  const data = req.query;
  const selectSql = `select * from user where name = '${data.name}'`;
  connection.query(selectSql, (err, result) => {
    if (err) {
      return;
    } else if (result.length === 0) {
      res.send({ msg: "该用户不存在", code: 201 });
    } else if (result.length !== 0) {
      result = JSON.parse(JSON.stringify(result));
      if (result[0].password == data.password) {
        res.send({ msg: "登录成功", code: 200 });
      } else {
        res.send({ msg: "密码错误", code: 202 });
      }
    }
  });
});

// app.all("/", function(req, res) {
//   res.send("success", res.data);
// });

http.listen(3000, function() {
  // 监听3000端口
  console.log("listening on *:3000");
});
