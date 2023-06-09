const express = require("express");
const app = express();
app.use(express.json());




//importing routers 
const home = require("./routes/home");
const createStudent = require("./routes/student/createStudent");
const deleteStudent = require("./routes/student/deleteStudent");
const createCourse  = require("./routes/course/createCourse");
const enrollStudent = require("./routes/student/enrollStudent");
const studentList = require("./routes/course/studentList");
const createAssignment = require("./routes/assignment/createAssignment");
const deleteAssignment = require("./routes/assignment/deleteAssignment");
const courseAssignments = require("./routes/course/courseAssignments");
const studentAssignments = require("./routes/student/studentAssignments");

//root end-points
app.use("/",home);
//student end-points
app.use("/createstudent",createStudent);
app.use("/deletestudent",deleteStudent);
app.use("/enrollstudent",enrollStudent);
app.use("/studentAssignments",studentAssignments);
//course end-points
app.use("/createCourse",createCourse);
app.use("/studentList",studentList);
app.use("/assignmentList",courseAssignments);
//assignment end-points
app.use("/createAssignment",createAssignment);
app.use("/deleteAssignment",deleteAssignment);




//serving app on port 8080
app.listen(8080,(error) =>{
    if(!error){
        console.log(`SERVER STARTED IN PORT ${8080}`);
    }else{
        console.log(error.message);
    }
})