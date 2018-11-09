'use strict'
var fs = require("fs");
var file = fs.readFileSync('./Home.html', 'utf-8');


class Home{

    constructor(){}

    render(){
    return file;
    }

}

exports.Home = Home;