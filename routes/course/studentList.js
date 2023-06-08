const express = require("express");
const router = express.Router();
const firestore = require('../../firebase.js').firestore;

router.get('/',async(request,response) =>{
    let students = [];
    try{
        //creating a reference to the course collection
        const collectionRefCourse = await firestore.collection("COURSE");
        const courseQuery = await collectionRefCourse.where("course_id","==",request.body.course_id).get();
        if(courseQuery.empty){
            //if course with the particular id doesn't exists
            response.json({message:"enter a valid course id"});
        }else{
            //if course with the particular id exists creating a reference to the collection
            const collectionRef = await firestore.collection("STUDENT-PROFILE");
            const query = await collectionRef.where("courses_enrolled","array-contains",request.body.course_id).get();
            if(query.empty){
                //if no student had enrolled in the particular course
                response.json({message:"no students had enrolled in this course"});
            }else{
                //if students had enrolled in the particular course
                query.forEach((doc) =>{
                    students.push(doc.data());
                });
                response.json({students:students});
                
            }
        }
        

    }catch(error){
        response.json({message:error.message});
    }
})


module.exports = router;