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
const submitAssignments = require("./routes/assignment/submitAssignment");
const submissionList = require("./routes/student/submissionList");



//root end-points
app.use("/",home);
//student end-points
app.use("/createstudent",createStudent);
app.use("/deletestudent",deleteStudent);
app.use("/enrollstudent",enrollStudent);
app.use("/studentassignments",studentAssignments);
app.use("/submissionlist",submissionList);
//course end-points
app.use("/createcourse",createCourse);
app.use("/studentlist",studentList);
app.use("/assignmentlist",courseAssignments);
//assignment end-points
app.use("/createassignment",createAssignment);
app.use("/deleteassignment",deleteAssignment);
app.use("/submitassignment",submitAssignments);




//serving app on port 8080
app.listen(8080,(error) =>{
    if(!error){
        console.log(`SERVER STARTED IN PORT ${8080}`);
    }else{
        console.log(error.message);
    }
})