'use strict'

var fs = require('fs');
var file = fs.readFileSync("./templates/Weather.html", 'utf-8');
var request = require("request"); //the request http wrapper module
var key = fs.readFileSync("./keys/key.txt", 'utf8');
var EventEmitter = require('events').EventEmitter;

class Weather extends EventEmitter {

    constructor() {
        super();
    }

    //render the weather tmeplate
    render() {
        return file;
    }


    //call the weather api and form a data structure to return
    //takes th lat and long as parameters
    getWeather(lat, long) {
        console.log("Called the weather module!");

        //form the url for the api
        var URL = "https://api.aerisapi.com/forecasts/" + lat + "," + long + "?" + key;
        console.log("API url : " + URL);

        var self = this; //need otherwise emission within the response object will be from response object (that will be local ‘this’)

        //request for data from the api
        request.get(URL, function (error, response, body) {

            var data = JSON.parse(body);
            var json = [];

            //get the seven days forecast info
            json = data.response[0].periods;

            var weekInfo = [];
            
            json.forEach(element => {
                //populating the info array with required information about the forecast
                var info = {};
                var dateTime = new Date(element.dateTimeISO);
                    //populating the info array with required information about the forecast
                    info["day"] = dateTime.getDay();
                    info["date"] = dateTime.getDate();
                    info["month"] = dateTime.getMonth();
                    info["weather"] = element.weather;
                    info["avgTemp"] = element.avgTempF;
                    info["avgFeelsLike"] = element.avgFeelslikeF;
                    info["maxTempF"] = element.maxTempF;
                    info["minTempF"] = element.minTempF;
                    weekInfo.push(info);
            });
            //Emit data
            console.log("Emiiting the data now..");
            self.emit("done", weekInfo);

        });
    }
}

exports.Weather = Weather;