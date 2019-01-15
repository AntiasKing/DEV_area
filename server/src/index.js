const express = require('express');
const morgan = require('morgan');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express initialization
const app = express();
const port = 8080;

// FireBase initialization
var serviceAccount = require('../config/area-94f1b-firebase-adminsdk-546mu-dc7f6f1e2c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://area-94f1b.firebaseio.com'
});


// Logger Morgan
app.use(morgan('dev'));

// Enable CORS
app.use(cors());
app.options("/*", cors());

// BoddyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/')(admin));
app.listen(port, () => console.log(`Server is running on port ${port}`));