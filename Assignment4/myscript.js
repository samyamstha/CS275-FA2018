$(document).ready(function(){

$("#calculator").click(function () {
    
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/calculate"
    }).then(function(data){
        $("#content_div").html(data).enhanceWithin();
    });
});

$("#home").click(function () {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/home"
    }).then(function(data){
$("#content_div").html(data).enhanceWithin();
    }).fail(function (jqXHR) {
        alert("\n Error here");
    });   
});


$("#weather").click(function () {
    var URL = "http://localhost:8080/weather";
});

    
});


function Calculation() {
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
            console.log("return " + msg.result);
            $("#results").html(msg.result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("I am in the error");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}

function route(URL) {

    console.log(URL);
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        success: function (msg) {
            console.log("return " + msg.result);
            $("#results").html(msg.result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("I am in the error");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}
