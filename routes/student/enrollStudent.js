const express = require("express");
const router = express.Router();
const firestore = require("../../firebase.js").firestore;

router.post('/',async(request,response) =>{
    const rollNo = request.body.roll_no;
    const courseCode = request.body.course_code;
    let courses;
    let docId;
    try{
        //creating a reference to the student profile collection
        const collectionRef = await firestore.collection("STUDENT-PROFILE");
        const query = await collectionRef.where("roll_no","==",rollNo).get()
        //checking weather a praticular student exists or not
        if(query.empty){
            //if student doesn't exists send error message
            response.json({message:"student with the particular roll number doesn't exists"}).status(400);
        }else{
            const collectionRefCourse = await firestore.collection("COURSE");
            const queryCourses = await collectionRefCourse.where("course_id","==",courseCode).get();

            if(queryCourses.empty){
                response.json({message:"invalid course id"}).status(400);
            }else{
                //if student exixts
                query.forEach((doc) =>{
                    //fetching the student profile id and the courses which he/she had enrolled
                    courses = doc.data().courses_enrolled;
                    docId = doc.id;
                });
                //checking weather the student already enrolled in the course
                const exists = courses.find((course) => course === courseCode);
                if(!exists){
                    //else enroll user in the particular course
                    courses.push(courseCode);
                    const ref = await collectionRef.doc(docId).set({
                        courses_enrolled:courses
                    },{merge:true});
                    response.json({message:"enrolled successfully"}).status(200);   
                }else{
                    //if already enrolled send error message
                    response.json({message:"the following student had been already enrolled in the course"}).status(409);
                }
            }
           
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }
});


module.exports = router;