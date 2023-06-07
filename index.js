const express = require("express");
const app = express();
app.use(express.json());




//importing routers 
const home = require("./routes/home");
const createStudent = require("./routes/student/createStudent");
const deleteStudent = require("./routes/student/deleteStudent");
const createCourse  = require("./routes/course/createCourse");
const enrollStudent = require("./routes/student/enrollStudent");


//root end-points
app.use("/",home);
//student end-points
app.use("/createstudent",createStudent);
app.use("/deletestudent",deleteStudent);
app.use("/enrollstudent",enrollStudent);
//course end-points
app.use("/createCourse",createCourse);



//serving app on port 8080
app.listen(8080,(error) =>{
    if(!error){
        console.log(`SERVER STARTED IN PORT ${8080}`);
    }else{
        console.log(error.message);
    }
})