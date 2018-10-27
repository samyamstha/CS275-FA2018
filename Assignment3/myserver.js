

var express = require('express');
var cors = require('cors');
var app = express();
app.use(express.static("."));
app.use(cors());
app.listen(8080, function(){
    console.log("Server running...");
});



app.get("/greet", function(req, res){
    res.send("Hello there!");
});


function factorial(n){
    var n = parseInt(n);
    if(n == 0){
        return 1;
    }
    return (n * factorial(n-1));
}


app.get("/factorial", function(req, res){
    var n = req.query.value;
    console.log("param " + n);
    var fact = factorial(n);
    console.log(fact);
    res.send({result : fact});
});


function summation(n){
    var n = parseInt(n);
    if(n == 0){
        return 0;
    }
    console.log(n);
    return (n + (summation(n - 1)));
}

app.get("/summation", function(req, res){

    
    var numValue = req.query.value;
    console.log("param " + numValue);
    var sum = summation(numValue);
    console.log("sum " + sum);
    res.send({result : sum});
    
});


