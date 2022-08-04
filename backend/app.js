/*
 ROUTER 추가하는거 아니면 절대 손대지말것
*/

var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./config/db');

/* API 설계 ROUTER 연결 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var viewRouter = require('./routes/view');
var modifyRouter = require('./routes/modify');
var contractRouter = require('./routes/contract');

var app = express();

/* 기본 셋팅 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* API 설계 ROUTER 목록 */
app.use('/', indexRouter); //메인
app.use('/users', usersRouter); //사용자정보
app.use('/board', boardRouter);
app.use('/view', viewRouter); 
app.use('/modify', modifyRouter);
app.use('/contract', contractRouter);

/* 404 에러 */
app.use(function(req, res, next) {
  next(createError(404));
});

/* 에러 핸들러 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
