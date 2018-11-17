'use strict'
var fs = require("fs");
var file = fs.readFileSync('./templates/DisplayTable.html', 'utf-8');


class DisplayTable{

    constructor(){}

    //return the DisplayTable template
    render(){
    return file;
    }

    displayStudents(){
        
    }

}

exports.DisplayTable = DisplayTable;