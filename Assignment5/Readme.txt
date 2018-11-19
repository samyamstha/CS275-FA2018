Samyam C. Shrestha
CS 275
Assignment 5

Technologies used for this application are JS, Jquery, Node and SQL. It is a web application that reads data from the sql database and displays it to the users upon the user’s request. Also, it is capable of adding data to the database. 

In order to use the app, first download the zipped folder and unzip its contents. Then in the terminal go to the directory of where the project is located and run the node server. The name of my server is MainServer.js. So, in order to run the server, you would type “node MainServer.js” in your terminal. After the server is successfully running, you should be able to see a message that says, ‘Server is running…’.
Then go to your browser (Google chrome preferred) and to http://localhost:8080/. The server is set to use the port 8080 here. After the app loads on this link, you should be able to see the home page on your browser.

The first page you will see is the page that can be used to display the students, course and grades table from the database. Moreover, for as for the extra credit question, I have setup the addition of student functionality in the same page. You can select the desired table from the dropdown and click on ‘Get Table’ button to see the respective table. Else, you can even fill up the required inputs in the add student section in order to add a new student.

The other menu is to search the student transcript search. Here you select a student (the dropdown list of the list is populated from the database as requested for the extra credit question) and the term and click on the search button to see the courses and the grades of the student that he/she has taken in the respective term.

