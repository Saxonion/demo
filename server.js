// var app = require('express')();  // 引入express模块
// var http = require('http').Server(app);

// app.get('/', function(req, res){  // 路由为localhost:3000时向客户端响应“hello world”
//   res.send('<h1>Hello world</h1>');  // 发送数据
// });

// http.listen(3000, function(){  // 监听3000端口
//   console.log('listening on *:3000');
// });

var express = require("express");
var app = express();
var http = require("http").Server(app);

// 路由为/默认src静态文件夹
app.use("/", express.static(__dirname + "/src"));

http.listen(3000, function() {
  // 监听3000端口
  console.log("listening on *:3000");
});
