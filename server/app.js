/* eslint-disable @typescript-eslint/no-var-requires */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// 引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
// 处理post请求参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// 页面路由
app.use('/', require('./routes/index'))

//引入插件
var vertoken = require('./token')
var expressJwt = require('express-jwt')
//解析token获取用户信息
app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (token == undefined) {
    return next();
  } else {
    vertoken.getToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
});
//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
  secret: 'famous_and_ancient_trees_token', //加密token 校验token时使用
  algorithms: ['HS256']
}).unless({
  path: ['/user/register', '/user/login', '/user/logout']  // token验证接口白名单
}))
//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
app.use(express.static(path.join(__dirname, 'public')));
//token失效返回信息
app.use(function (err, req, res, next) {
  // status === 401
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('当前token已失效');
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//设置跨域访问
app.all('*', function (req, res, next) {
  //设置全局的全域问题，我这里是把所有的全部允许了，如果不怕麻烦或者业务需求，你也可以在请求里面写对应的跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

module.exports = app;
