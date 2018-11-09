var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require Home.js
var HomeController = require('./Home.js');
//instantiate Home.js object
var homeObj = new HomeController.Home();


//require Calculate.js
var CalculateController = require('./calculate.js');
//instantiate Calculate.js object
var calcObj = new CalculateController.Calculate();


app.get("/home", function (req, res) {
var content = homeObj.render();
res.send(content);
});

app.get("/calculate", function (req, res) {
    var content = calcObj.render();
    res.send(content);
});

//takes the request for factorial
app.get("/factorial", function (req, res) {
    var fact = calcObj.factorial(req.query.value);
    res.send({result: fact});
});

//takes the request for summation
app.get("/summation", function (req, res) {
    var numValue = req.query.value;
    console.log("param " + numValue);
    var sum = calcObj.summation(numValue);
    console.log("sum " + sum);
    res.send({ result: sum });

});


app.listen(8080, function () {
    console.log("Server is up and running...");
})