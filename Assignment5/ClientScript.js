$(document).ready(function () {

    //Display the display table page in startup
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/displayTable"
    }).then(function (data) {
        $("#content_div").html(data).enhanceWithin();
    });


    $("#display").click(function () {
        let url = "http://localhost:8080/displaytable";
        route(url);
    });

    $("#search").click(function () {
        let url = "http://localhost:8080/studentTranscriptSearch";
        route(url);
           //get the latest name of the students and populate the Students dropdown
            getStudentNames();
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

//call the server for display table requests
function getData() {
    console.log("Here");
    var selection = $("#aDropDown").val();
    var URL = "";
    var data = "";
    var dynamicTableRows = "";
    if (selection == "studentTable") {
        data += "<table data-role='table' class='ui-responsive' ><thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>DoB</th><th>Major</th></tr></thead>" +
            "<tbody>";
        URL = "http://localhost:8080/getStudents";
    } else if (selection == "courseTable") {
        data += "<table data-role='table' class='ui-responsive'><thead><tr><th>ID</th><th>Description</th></tr></thead>" +
            "<tbody>";
        URL = "http://localhost:8080/getCourses";
    } else {
        data += "<table data-role='table' class='ui-responsive'><thead><tr><th>ID</th><th>Course ID</th><th>Student ID</th><th>Term</th><th>Grade</th></tr></thead>" +
            "<tbody>";
        URL = "http://localhost:8080/getGrades";
    }

    //parameters to send along the GET request
    var params = {};

    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        success: function (msg) {
            console.log(msg);
            for (var i = 0; i < msg.length; i++) {
                if (selection == "studentTable") {
                    var date = new Date(msg[i].DoB);
                    var DoB = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                    dynamicTableRows = "<tr><td>" + msg[i].StudentID + "</td><td>" + msg[i].FirstName + "</td><td>" + msg[i].LastName + "</td><td>" + DoB + "</td><td>" + msg[i].Major + "</td></tr>";
                } else if (selection == "courseTable") {
                    dynamicTableRows = "<tr><td>" + msg[i].CourseID + "</td><td>" + msg[i].Description + "</td></tr>";
                } else {
                    dynamicTableRows = "<tr><td>" + msg[i].GradeID + "</td><td>" + msg[i].CourseID + "</td><td>" + msg[i].StudentID + "</td><td>" + msg[i].Term + "</td><td>" + msg[i].Grade + "</td></tr>";
                }
                data += dynamicTableRows;
            }
            data += "</tbody></table>";
            $("#results").html(data).enhanceWithin();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error occured for while getting display table data.");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}

//call the server for transcript 
function getSearchData() {
    var studentName = $("#studentDD").val();
    var termName = $("#termDD").val();
    var URL = "http://localhost:8080/getTranscript";

    var data = "<table data-role='table' class='ui-responsive' ><thead><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Term</th><th>Course ID</th><th>Description</th><th>Grade</th></tr></thead>" +
    "<tbody>";

    //parameters to send along the GET request
    var params = {
        student : studentName,
        term : termName
    };

    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        success: function (msg) {

            if(msg.length == 0){
                data = "There is no data to display!";
            }else{
            for (var i = 0; i < msg.length; i++) {
                data += "<tr><td>" + msg[i].StudentID + "</td><td>" + msg[i].FirstName + "</td><td>" + msg[i].LastName + "</td><td>" + msg[i].Term + "</td><td>" + msg[i].CourseID + 
                "</td><td>" + msg[i].Description + "</td><td>" + msg[i].Grade +"</td></tr>";
            }
            data += "</tbody></table>";
        }
            $("#results").html(data).enhanceWithin();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error occured for the getSearchData.");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}


//call to server to get the latest names of the students
function getStudentNames(){
    var URL = "http://localhost:8080/getStudentNames";
    var data = "<Select id='studentDD'>";

    $.ajax({
        type:"GET",
        url: URL,
        success: function(msg){
            for(var i =0; i < msg.length; i++){
                console.log(msg[i].FirstName);
                data += "<option value=" + msg[i].FirstName + ">" + msg[i].FirstName + "</option>";
            }
            data += "</Select>";
            $("#studentsName").html(data).enhanceWithin();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
            console.log("Error occured for the getStudentsName.");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }
    });
}

//call the server to add respective student
function addStudent(){
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var dob = $("#dob").val();
    var major = $("#major").val();

    // var params = {
    //     fName : firstName,
    //     lName : lastName,
    //     DoB : dob,
    //     maj : major
    // };
    console.log(firstName, dob, major, lastName);

    var URL = "http://localhost:8080/addStudent?fName=" + firstName + "&lName=" + lastName + "&DoB=" + dob + "&maj=" + major;
    $.ajax({
        type:"POST",
        url:URL,
        success: function (msg) {
            console.log(firstName, dob, major, lastName);
            var str = "Student added!"
            $("#results").html(msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error occured for the add student process.");
            //Display error message
            $("#results").html("<center>" + "Error Occured" + "</center>");
        }

    })

    
}


