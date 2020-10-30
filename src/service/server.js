/*
    nodejs后台服务器server.js
*/
const express = require('express');
const path = require('path');
const router = require('./controller.js');
const bodyParser = require('body-parser');
const app = express();

// 启动静态资源服务
// app.use('/www',express.static('public'));

// 处理请求参数
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 启动服务器功能
// 配置路由
app.use(router);
// 监听端口
app.listen(3000,()=>{
    console.log('running...');
});