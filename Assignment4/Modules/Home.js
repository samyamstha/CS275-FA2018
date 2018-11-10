'use strict'
var fs = require("fs");
var file = fs.readFileSync('./templates/Home.html', 'utf-8');


class Home{

    constructor(){}

    //return the home template
    render(){
    return file;
    }

}

exports.Home = Home;