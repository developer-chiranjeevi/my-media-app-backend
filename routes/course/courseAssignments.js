const express = require("express");
const router = express.Router();
const firestore = require("../../firebase").firestore;


router.get('/',async(request,response) =>{
    try{
        //creating a reference to the course collection
        const courseCollectionRef = await firestore.collection("COURSE");
        const courseQuery = await courseCollectionRef.where("course_id","==",request.body.course_id).get();
        let assignments = [];
        if(courseQuery.empty){
            //if the course with the follwing ID doesn't exists
            response.json({message:"Invalid Course ID"}).status(404);
        }else{
            //if course with the following ID exists
            //creating a reference to the assignment collection
            const collectionRef = await firestore.collection("ASSIGNMENT");
            const query = await collectionRef.where("course_id","==",request.body.course_id).get();

            if(query.empty){
                //if no assignments exists for the following course
                response.json({message:"No Assignments Exists for the following course"}).status(404);
            }else{
                //if assignments exists for the following course
                query.forEach((doc) =>{
                    assignments.push(doc.data());
                });
                response.json({assignments:assignments}).status(200);
            }
        }

    }catch(error){
        response.json({message:error.message});
    }
})

module.exports  = router;