var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$Pass1@@',
    database: 'CS275DB'
});
con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB.")
    }
});



//require DisplayTable.js
var DisplayTableController = require('./modules/DisplayTable.js');
//instantiate the object of DisplayTable.js
var displayTable = new DisplayTableController.DisplayTable();

//require StudentTranscriptSearch
var StudentTranscriptSearchController = require('./modules/StudentTranscriptSearch.js');

//instantiate the object of StudentTranscriptSearch
var studentTranscriptSearch = new StudentTranscriptSearchController.StudentTranscriptSearch();




app.get("/displaytable", function (req, res) {

    var content = displayTable.render();
    res.send(content);
});

app.get("/studentTranscriptSearch", function (req, res) {
    var content = studentTranscriptSearch.render();
    res.send(content);
});


app.get("/getStudents", function (req, res) {
    con.query('select * from student',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying process");
            } else {
                console.log("Result : ", rows);
                res.send(rows);
            }
        });
});


app.get("/getTranscript", function (req, res) {
    console.log("*********");
    var studentName = req.query.student;
    var termName = req.query.term;
    console.log(studentName + " " + termName);
    var queryStr = "select student.StudentID, student.FirstName, student.LastName, grades.Term, course.CourseID, course.Description, grades.Grade ";
    queryStr += "from student, course, grades ";
    queryStr += "where student.FirstName = \'" + studentName + "\' && grades.StudentID = student.StudentID && grades.CourseID = course.CourseID && grades.Term=\'" + termName + "\'";
   console.log(queryStr);
    con.query(queryStr,
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying process");
            } else {
                console.log("Result : ", rows);
                res.send(rows);
            }
        });
});

app.get("/getCourses", function (req, res) {
    console.log("*********");
    con.query('select * from course',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying get courses");
            } else {
                console.log("Result : ", rows);
                res.send(rows);
            }
        });
});

app.get("/getGrades", function (req, res) {
    console.log("*********");
    con.query('select * from grades',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying process");
            } else {
                console.log("Result : ", rows);
                res.send(rows);
            }
        });
});



app.listen(8080, function () {
    console.log("Server is running...")
})