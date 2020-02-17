const express = require('express')
const app = express()


//设置跨域访问
app.all('*', function(req, res, next) {
  console.log('???')
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/getData', function (req, res) {
  res.send("get data")
})
 
app.listen(3000)