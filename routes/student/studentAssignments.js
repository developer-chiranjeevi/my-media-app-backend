const express = require('express');
const router = express.Router();
const firestore = require("../../firebase").firestore;


router.get('/',async(request,response) =>{
    try{
        //creating a reference to the student-profile collection
        const studentCollectionRef = await firestore.collection("STUDENT-PROFILE");
        const studentQuery = await studentCollectionRef.where("roll_no","==",request.body.roll_no).get();
        const assignments = [];
        let courses = [];
        if(!studentQuery.empty){
            //if student roll no is valid 
            //get list of courses which the student had enrolled
            studentQuery.forEach((doc) =>{
               courses = doc.data().courses_enrolled;
            });
           
        }else{
            //if invalid roll number send error message
            response.json({message:"Invalid Student Roll Number"}).status(400);
        }
        //fetching the array of assignments for the following course
        for(let i = 0;i<courses.length;i++){
            //fetching assignments for all the courses which the student had enrolled
            const assignmentCollectionRef = await firestore.collection("ASSIGNMENT");
            const assignmentQuery = await assignmentCollectionRef.where("course_id","==",courses[i]).get();
            if(assignmentQuery.empty){
                //if no assignments exists for the particulat student
                response.json({message:"No assignments Assigned"}).status(200);
            }else{
                //if assignment exists fetch and store it in an array
                assignmentQuery.forEach((doc) =>{
                    assignments.push(doc.data());

                });
            }
        }
        response.json({assignments:assignments}).status(200);

    }catch(error){
        response.json({message:error.messsage}).status(500);
    }
});


module.exports = router;