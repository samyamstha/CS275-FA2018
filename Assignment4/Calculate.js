'use strict'

var fs = require('fs');
var file = fs.readFileSync("calculate.html");

class Calculate {

    constructor() {
    }

    render(){
        return file;
    }

    //calculate factorial
    factorial(n) {
        console.log("*******");
        var n = parseInt(n);
        if (n == 0) {
            return 1;
        }
        return (n * this.factorial(n - 1));
    }
    //calculate summation
    summation(n) {
        var n = parseInt(n);
        if (n == 0) {
            return 0;
        }
        console.log(n);
        return (n + (this.summation(n - 1)));
    }

}

exports.Calculate = Calculate;