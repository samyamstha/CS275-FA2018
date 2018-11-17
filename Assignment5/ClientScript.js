$(document).ready(function () {

    //Display the display table page in startup
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8080/displayTable"
    // }).then(function (data) {
    //     $("#content_div").html(data).enhanceWithin();
    // });


    $("#display").click(function () {
        let url = "http://localhost:8080/displaytable";
        route(url);
    });

    $("#search").click(function () {
        let url = "http://localhost:8080/studentTranscriptSearch";
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


    function getData(){
        console.log("Here");
        var selection = $("#aDropDown").val();
        var URL = "";
        var data = "";
        var dynamicTableRows = "";
        if (selection == "studentTable") {
            data += "<table border='1'><thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>DoB</th><th>Major</th></tr></thead>"+
            "<tbody>";
            URL = "http://localhost:8080/getStudents";
            // dynamicTableRows = "<tr><td>" +msg[i].StudentID + "</td><td>" + msg[i].FirstName + "</td><td>" + msg[i].LastName + "</td><td>" + msg[i].DoB + "</td><td>" + msg[i].Major + "</td></tr>";
        } else if (selection == "courseTable") {
            data += "<table border='1'><thead><tr><th>ID</th><th>Description</th></tr></thead>"+
                "<tbody>";
            URL = "http://localhost:8080/getCourses";
            // dynamicTableRows = "<tr><td>" + msg[i].CourseID + "</td><td>" + msg[i].Description +  "</td></tr>";
        } else {
            data += "<table border='1'><thead><tr><th>ID</th><th>Course ID</th><th>Student ID</th><th>Term</th><th>Grade</th></tr></thead>"+
                "<tbody>";
            URL = "http://localhost:8080/getGrades";
            // dynamicTableRows = "<tr><td>" + msg[i].GradeID + "</td><td>" + msg[i].CourseID +  "</td><td>" + msg[i].StudentID + "</td><td>"  + msg[0].Term + "</td><td>" + msg[0].Grade +"</td></tr>";

        }


        //parameters to send along the GET request
        var params = {};

        $.ajax({
            type: "GET",
            url: URL,
            data: params,
            success: function (msg) {
                console.log(msg);
                
                
                for(var i =0; i < msg.length; i++){
                    if (selection == "studentTable") {                     
                        dynamicTableRows = "<tr><td>" +msg[i].StudentID + "</td><td>" + msg[i].FirstName + "</td><td>" + msg[i].LastName + "</td><td>" + msg[i].DoB + "</td><td>" + msg[i].Major + "</td></tr>";
                    } else if (selection == "courseTable") {            
                        dynamicTableRows = "<tr><td>" + msg[i].CourseID + "</td><td>" + msg[i].Description +  "</td></tr>";
                    } else {
                        dynamicTableRows = "<tr><td>" + msg[i].GradeID + "</td><td>" + msg[i].CourseID +  "</td><td>" + msg[i].StudentID + "</td><td>"  + msg[i].Term + "</td><td>" + msg[i].Grade +"</td></tr>";
                    }
                    data+= dynamicTableRows;
                }
                data +=  "</tbody></table>";
                $("#results").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error occured for the Calculator.");
                //Display error message
                $("#results").html("<center>" + "Error Occured" + "</center>");
            }
        });
    }


