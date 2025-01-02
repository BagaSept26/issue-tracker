'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
const helmet      = require('helmet');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();
let testResults = []; // <-- Perubahan: Variable untuk menyimpan hasil test

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
    // <-- Perubahan: Hapus setting view engine
    //app.set('view engine', 'ejs');

    //Sample front-end
app.route('/:project/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/issue.html');
    });

    //Index page (static HTML)
app.route('/')
    .get(function (req, res) {
        // <-- Perubahan: Mengirim hasil test melalui API
    if(process.env.NODE_ENV==='test') {
        res.json({tests: testResults});
    } else{
        res.sendFile(process.cwd() + '/views/index.html');
    }
    });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
    if(process.env.NODE_ENV==='test') {
        console.log('Running Tests...');
        setTimeout(function () {
        try {
                runner.run((err, results) => {
                    if(err){
                        console.log("Error run test", err)
                        testResults = [];
                    } else {
                        testResults = results.tests;
                    }
                 });
            } catch(e) {
                console.log('Tests are not valid:');
                console.error(e);
                testResults = [];
            }
            }, 1500);
    }
});

module.exports = app; //for testing