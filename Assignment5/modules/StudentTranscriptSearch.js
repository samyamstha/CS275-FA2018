'use strict'
var fs = require("fs");
var file = fs.readFileSync('./templates/StudentTranscriptSearch.html', 'utf-8');


class StudentTranscriptSearch{

    constructor(){}

    //return the StudentTranscriptSearch template
    render(){
    return file;
    }

}

exports.StudentTranscriptSearch = StudentTranscriptSearch;