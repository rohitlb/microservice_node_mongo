var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/db', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
  });
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/city')(app, mongoose);
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
})
