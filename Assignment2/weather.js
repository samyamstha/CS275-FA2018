
$(document).ready(function () {

    var resultDiv = document.getElementById("results");

    $("#callButton").click(function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                var id = document.getElementById("clientId").value;
                var key = document.getElementById("secretKey").value;
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                var URL = "https://api.aerisapi.com/forecasts/" + lat + "," + lon + "?client_id=" + id + "&client_secret=" + key;
                request(URL);

            });
        }
        else {
            resultDiv.innerHTML = "Geolocation is not supported by this browser.";
        }
    });


    function request(URL) {
        $.ajax({ type: "GET", url: URL})
            .then(function (data) { 
                if (data.success) {
                    var json = {};
                    json = data.response[0].periods;
                    console.log(json);
                    $("#results").html(json[0].maxTempF);
                }
                else {
                    alert("Error fetching data");
                }
            });
    }

});