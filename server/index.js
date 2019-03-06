var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const admin = require('firebase-admin');
const utils = require('./src/utils');

var serviceAccount = require('./config/area-94f1b-firebase-adminsdk-546mu-dc7f6f1e2c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://area-94f1b.firebaseio.com'
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('assets'));

app.use(session({
    secret: 'kitKat',
    name: 'cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./src/routes/')(admin));

app.listen(port);
console.log("Server on " + port);