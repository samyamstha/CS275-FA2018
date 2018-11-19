var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pass = fs.readFileSync("./keys/pass.txt", 'utf8'); //get the password from the file
var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var mysql = require('mysql');

//create connection to mysql
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: pass,
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



// render displaytable page
app.get("/displaytable", function (req, res) {

    var content = displayTable.render();
    res.send(content);
});


//render studetntranscriptsearch page
app.get("/studentTranscriptSearch", function (req, res) {
    var content = studentTranscriptSearch.render();
    res.send(content);

});

//fetch students from the database
app.get("/getStudents", function (req, res) {
    con.query('select * from student',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying process");
            } else {
                //console.log("Result : ", rows);
                res.send(rows);
            }
        });
});



//fetch the transcript search from the database
app.get("/getTranscript", function (req, res) {
    
    var studentName = req.query.student;
    var termName = req.query.term;
    // console.log(studentName + " " + termName);
    var queryStr = "select student.StudentID, student.FirstName, student.LastName, grades.Term, course.CourseID, course.Description, grades.Grade ";
    queryStr += "from student, course, grades ";
    queryStr += "where student.FirstName = \'" + studentName + "\' && grades.StudentID = student.StudentID && grades.CourseID = course.CourseID && grades.Term=\'" + termName + "\'";
//    console.log(queryStr);
    con.query(queryStr,
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying process");
            } else {
                //console.log("Result : ", rows);
                res.send(rows);
            }
        });
});


//get the courses data from the database
app.get("/getCourses", function (req, res) {
    console.log("*********");
    con.query('select * from course',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying get courses");
            } else {
                //console.log("Result : ", rows);
                res.send(rows);
            }
        });
});


//get the grades data from the database
app.get("/getGrades", function (req, res) {
    console.log("*********");
    con.query('select * from grades',
        function (err, rows, fields) {
            if (err) {
                console.log("Error during querying for grades.");
            } else {
                //console.log("Result : ", rows);
                res.send(rows);
            }
        });
});

//get the latest student names from the database
app.get("/getStudentNames", function(req, res){
    con.query('select FirstName from student',
function (err, rows, fields){
    if(err){
        console.log("Error occured while getting the student names.");
    }else{
        console.log("Result : ", rows[0].FirstName);
        res.send(rows);
    }
})
});


//add student to the database
app.post("/addStudent", function(req, res){

    var firstName = req.query.fName;
    var lastName = req.query.lName;
    var dob = req.query.DoB;
    var major = req.query.maj;
    var sql = "insert into student (FirstName, LastName, DoB, Major) values (\'" + firstName + '\',\'' + lastName + '\',\'' + dob + '\',\'' + major + "\')";
console.log(sql);
    con.query(sql,
function (err, rows, fields){
    if(err){
        console.log("Error occured while adding student.");
        console.log(err);
    }else{
        res.send("Student Added!");
    }
})
});

app.listen(8080, function () {
    console.log("Server is running...")
})