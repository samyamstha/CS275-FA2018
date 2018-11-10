$(document).ready(function () {

    //Display the home page in startup
    $.ajax({
        type: "GET",
        url : "http://localhost:8080/home"
    }).then(function (data) {
    $("#content_div").html(data).enhanceWithin();
});

//called when the calculator menu is clicked
    $("#calculator").click(function () {
        let url = "http://localhost:8080/calculate";
        route(url);
    });

    //called when the home menu is clicked
    $("#home").click(function () {

        let url = "http://localhost:8080/home";
        route(url);

    });

    //called when the weather menu is clicked
    $("#weather").click(function () {
        let url = "http://localhost:8080/weather";
        route(url);
    });


});

//route the urls to display specific view(html) templates
function route(URL) {

    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        success: function (msg) {
            $("#content_div").html(msg).enhanceWithin();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("I am in the error");
            //Display error message
            $("#content_div").html("<center>" + "Error Occured" + "</center>");
        }
    });
}
//Perform the factorial and summation
//
function Calculation() {

    //get the user input and selection
    var user_input = $("#usr_input").val().trim();
    var selection = $("#aDropDown").val();

    console.log(user_input + " " + selection);


    //check for no input
    if (user_input == "") {
        $("#results").html("Invalid Input!");
        return;
    }

    //check for valid input
    if (isNaN(user_input)) {
        console.log("User Input: " + user_input);
        $("#results").html("Invalid Input!");
        return;
    }

    //check for decimal inputs
    if ((user_input - Math.floor(user_input)) !== 0) {
        $("#results").html("Input cannot be a decimal value.");
        return;
    }

    //check for negative number input
    if (user_input < 0) {
        $("#results").html("Input cannot be a negative value");
        return;
    }


    //Create the URL
    if (selection === "factorial") {
        var URL = "http://localhost:8080/factorial";
    } else {
        var URL = "http://localhost:8080/summation";
    }

    //parameters to send along the GET request
    var params = {
        value: user_input
    };

    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        success: function (msg) {
            $("#results").html(msg.result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error occured for the Calculator.");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}

//When clicked the get weather button
function getWeather(){
// $("#callButton").click(function () {

    //parameters to send along the GET request
    var params = {};
    var resultDiv = document.getElementById("results");
    console.log("Weather Clicked");

//Inform the users that the data is being loaded..
    if(true){
        $("#results").html("<center><h2>Loading...</h2></center>");
    }

    //Get the geolocation of the user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
        
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                //set the url
                var URL = "http://localhost:8080/getWeather";

                //set the params to be passed along with the url
                params["lat"] = lat;
                params["long"] = lon;
                console.log("Params = " + params.lat, + " " + params.long);

               request(URL, params);
            
        });
    }
    else {
        resultDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
// });

}

function request(URL, params) {

    //Array to look up the days of the week
    var dayOfTheWeek = new Array(7);
    dayOfTheWeek[0] = "Sunday";
    dayOfTheWeek[1] = "Monday";
    dayOfTheWeek[2] = "Tuesday";
    dayOfTheWeek[3] = "Wednesday";
    dayOfTheWeek[4] = "Thursday";
    dayOfTheWeek[5] = "Friday";
    dayOfTheWeek[6] = "Saturday";

    //Array to look up the months of the year
    var monthOfTheYear = new Array();
    monthOfTheYear[0] = "January";
    monthOfTheYear[1] = "February";
    monthOfTheYear[2] = "March";
    monthOfTheYear[3] = "April";
    monthOfTheYear[4] = "May";
    monthOfTheYear[5] = "June";
    monthOfTheYear[6] = "July";
    monthOfTheYear[7] = "August";
    monthOfTheYear[8] = "September";
    monthOfTheYear[9] = "October";
    monthOfTheYear[10] = "November";
    monthOfTheYear[11] = "December";

    // String variable to create html table
    var tableStr = "</br></br><table id='weather-table' data-role= 'table'><thead><th>Day</th><th>Weather</th><th>Avg Feels Like</th><th>Avg Temp</th><th>Max Temp</th><th>Min Temp</th></thead><tbody>";


    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        error: function (jqXHR, textStatus, errorThrown) {
            //Display error message
            $("#results").html("<center>" + "An error has occured" + "</center>");
        }
    })
        .then(function (info) {
            data = {};
                info.forEach(element => {
                    
                    tableStr += "<tr><td>" + dayOfTheWeek[element.day] + ", "
                    + monthOfTheYear[element.month] + " " + element.date + "</td><td>"
                    + element.weather + "</td><td>" + element.avgFeelsLike + "</td>"
                    + "<td>" + element.avgTemp + "</td><td>" + element.maxTempF + "</td><td>"
                    + element.minTempF + "</td></tr>";
                });

                //display the html table with data
                $("#results").html(tableStr + "</tbody></table>");
        });
}


