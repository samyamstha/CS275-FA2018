'use strict'

var fs = require('fs');
var file = fs.readFileSync("./templates/Calculate.html", 'utf-8');

class Calculate {

    constructor() {
    }


    //return the template for calculate 
    render(){
        return file;
    }

    //calculate factorial
    factorial(n) {
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