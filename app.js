var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./routes/api');

var app = express();

// view engine setup 注册前端模板视图
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());//解析Json数据
app.use(express.urlencoded({ extended: false }));//解析表单数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-control-Allow-Methods", "PUT,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "X-Requestd-witd")
  res.header("Access-Control-Allow-Headers","Content-Type")
  next()
})

////注册路由模块  挂载
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 程序出问题时的提示
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
