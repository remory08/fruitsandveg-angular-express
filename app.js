var express    = require('express');
var bodyParser = require('body-parser');
var vegetables = require('./routes/vegetables');
var fruits = require('./routes/fruits');
var cors = require('cors')
// var supertest = require('supertest');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


app.use('/api/vegetables', vegetables);
app.use('/api/fruits', fruits)

app.listen(process.env.PORT || 8080);
console.log('server started on port 8080');


module.exports= app;
