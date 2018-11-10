var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require Home.js
var HomeController = require('./Modules/Home.js');
//instantiate Home.js object
var homeObj = new HomeController.Home();


//require Calculate.js
var CalculateController = require('./Modules/Calculate.js');
//instantiate Calculate.js object
var calcObj = new CalculateController.Calculate();

//require Weather.js
var WeatherController = require('./Modules/Weather.js');
//instantiate Weather.js object
var weatherObj = new WeatherController.Weather();

//send the home template
app.get("/home", function (req, res) {
    var content = homeObj.render();
    res.send(content);
});

//send the calculate template
app.get("/calculate", function (req, res) {
    var content = calcObj.render();
    res.send(content);
});

//send the weather template
app.get("/weather", function (req, res) {
    var content = weatherObj.render();
    res.send(content);
});


//takes the request for factorial
app.get("/factorial", function (req, res) {
    var fact = calcObj.factorial(req.query.value);
    res.send({ result: fact });
});

//takes the request for summation
app.get("/summation", function (req, res) {
    var numValue = req.query.value;
    console.log("param " + numValue);
    var sum = calcObj.summation(numValue);
    console.log("sum " + sum);
    res.send({ result: sum });

});

//takes the request for getWeather
app.get("/getWeather", function(req,res){
    var lat = req.query.lat;
    var long = req.query.long;
    weatherObj.once('done', function(msg){
        console.log(msg);
        res.send(msg);
    });
  
    //make the call to the getWeather function from the Weather modules
    weatherObj.getWeather(lat,long);
});


//make the server listen to port 8080
app.listen(8080, function () {
    console.log("Server is up and running...");
})