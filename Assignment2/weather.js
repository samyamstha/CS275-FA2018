
$(document).ready(function () {

    var resultDiv = document.getElementById("results");
    var errStr = "Please, provide a valid client Id and secret Key!"

    $("#callButton").click(function () {


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if ((document.getElementById("clientId").value === "") || (document.getElementById("secretKey").value === "")) {
                    $("#results").html("<center>" + errStr + "</center>");
                } else {
                    var id = document.getElementById("clientId").value;
                    var key = document.getElementById("secretKey").value;
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;

                    var URL = "https://api.aerisapi.com/forecasts/" + lat + "," + lon + "?client_id=" + id + "&client_secret=" + key;
                    request(URL);
                }


            });
        }
        else {
            resultDiv.innerHTML = "Geolocation is not supported by this browser.";
        }
    });

    function request(URL) {
        var dayOfTheWeek = new Array(7);
        dayOfTheWeek[0] = "Sunday";
        dayOfTheWeek[1] = "Monday";
        dayOfTheWeek[2] = "Tuesday";
        dayOfTheWeek[3] = "Wednesday";
        dayOfTheWeek[4] = "Thursday";
        dayOfTheWeek[5] = "Friday";
        dayOfTheWeek[6] = "Saturday";

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

        var tableStr = "</br></br><table id='weather-table' data-role= 'table'><thead><th>Day</th><th>Weather</th><th>Avg Feels Like</th><th>Avg Temp</th><th>Max Temp</th><th>Min Temp</th></thead><tbody>";
        $.ajax({
            type: "GET",
            url: URL,
               error: function(jqXHR, textStatus, errorThrown) {
                $("#results").html("<center>" + errStr + "</center>");
            }
        })
            .then(function (data) {
//                console.log(data);
                if (data.success) {
                    var json = [];
                    json = data.response[0].periods;
                    console.log(json);
                    info = [];
                    $.each(json, function () {
                        var dateTime = new Date(this.dateTimeISO);
                        console.log(dateTime);
                        info["day"] = dateTime.getDay();
                        info["date"] = dateTime.getDate();
                        info["month"] = dateTime.getMonth();
                        info["weather"] = this.weather;
                        info["avgTemp"] = this.avgTempF;
                        info["avgFeelsLike"] = this.avgFeelslikeF;
                        info["maxTempF"] = this.maxTempF;
                        info["minTempF"] = this.minTempF;
                        tableStr += "<tr><td>" + dayOfTheWeek[info.day] + ", "
                            + monthOfTheYear[info.month] + " " + info.date + "</td><td>"
                            + info.weather + "</td><td>" + info.avgFeelsLike + "</td>"
                            + "<td>" + info.avgTemp + "</td><td>" + info.maxTempF + "</td><td>"
                            + info.minTempF + "</td></tr>";
                    });

                    $("#results").html(tableStr + "</tbody></table>");
                }
                else {
                    alert("Error while trying to fetch data!");
                }
            });
    }

});