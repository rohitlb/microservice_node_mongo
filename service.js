var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose'),
    cors           = require('cors');

  mongoose.connect('mongodb://ec2-54-172-2-45.compute-1.amazonaws.com:27017/kml_db', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
  });
// Middlewares
//app.use(cors);
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(allowCrossDomain);

// Import Models and Controllers
var modelCity = require('./models/city')(app, mongoose);
var modelPet = require('./models/pet')(app, mongoose);
var CityCtrl = require('./controllers/city');

// API routers
var pets = express.Router();

pets.get('/hello', function(req, res) {
   res.send("Hello World!");
});

pets.route('/pet/location/:pet')
	.get(CityCtrl.findClosePlaces)

app.use('/', pets);

// Start Server
app.listen(3000, function(){
	console.log("Server runing on http://localhost:3000");
});
