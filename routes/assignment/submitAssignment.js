const express = require('express');
const router = express.Router();
const firestore = require('../../firebase').firestore;


router.post('/',async(request,response) =>{
    //checking weather the student roll number and the assignment ID is valid
    let submissions = [];
    let courses = [];
    let docId;
    let course_id;
    let assignmentsubmissions;
    let studentDocId;

    try{
        //creating a reference to the the student profile collection
        const studentCollection = firestore.collection("STUDENT-PROFILE");
        const studentQuery  = await studentCollection.where("roll_no","==",request.body.roll_no).get();
        //creating a reference to the assignments collection
        const assignmentCollection = firestore.collection("ASSIGNMENT");
        const assignmentQuery = await assignmentCollection.where("assignment_id","==",request.body.assignment_id).get();
        //checking if assignment already submitted by the follwing student
        assignmentQuery.forEach((doc) =>{
            assignmentsubmissions = doc.data().submissions;
        });
        
        const exi = assignmentsubmissions.find((sub) => sub == request.body.roll_no);
        if(exi){
            response.json({message:"assignment already submitted"});
        }else{


        //fetching course id
        await assignmentQuery.forEach((doc) =>{
            course_id = doc.data().course_id;
        })
        //checking weather the student is enrolled in the course
        const res = studentQuery.forEach((doc) =>{
            courses = doc.data().courses_enrolled;
        })


        const exists = courses.find((course) => course === course_id);
        if(exists){
            if(!studentQuery.empty && !assignmentQuery.empty){
                //adding student roll number in submissions list and creating a sub collection in students profile
                assignmentQuery.forEach((doc) =>{
                    submissions  = doc.data().submissions;
                    submissions.push(request.body.roll_no);
                    docId = doc.id;
                });
                
                const res = await assignmentCollection.doc(docId).set({
                    submissions:submissions,
                },{merge:true})
                
                //fetching doc ID of the student profile
                studentQuery.forEach((doc) =>{
                    studentDocId = doc.id;
                    
                });
                //make a entry in students profile sub collection
                await studentCollection.doc(studentDocId).collection("SUBMISSIONS").doc(request.body.assignment_id).set({
                    course_id:course_id,
                    resource_url:"https://sampledoc.com",
                    scores_awarded:0,
                    isEvaluated:false,
                    
                })



                response.json({message:"assignment submitted successfully"}).status(200);
            }else{
                response.json({message:"invalid roll number or assignment number"}).status(404);
            }
        }else{
            response.json({message:"the following student cannot make a submission for the following assignment"}).status(400);
        }
    }
    }catch(error){
        response.json({message:error.message}).status(500);
    }
});


module.exports = router;