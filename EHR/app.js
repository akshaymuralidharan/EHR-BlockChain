var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var Web3 = require('web3');
var MyContractJSON = require(path.join(__dirname, 'build/contracts/ehr.json'));
contractAddress = MyContractJSON.networks['4002'].address;
coinbase = "0xc7Ab912A927d0C5eB1810d0fEDe302B7D22Ea51a";
abi = MyContractJSON.abi;
web3 = new Web3(Web3.providers.HttpProvider("http://localhost:8545"));

MyContract = new web3.eth.Contract(abi, contractAddress);

var patientRouter = require('./routes/patient');
var doctorRouter = require('./routes/doctor');
var hospitalRouter = require('./routes/hospital');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/hospital', hospitalRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
