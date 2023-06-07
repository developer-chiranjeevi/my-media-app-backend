const express = require("express");
const firestore = require("../../firebase.js").firestore;
const router = express.Router();

router.post('/',async(request,response)=>{
    const courseId = request.body.course_id;
    //creating a reference to the course collection
    const collectionRef = firestore.collection("COURSE");
    try{
        //checking weather a course with the particular id already exists
        const query = await collectionRef.where("course_id","==",courseId).get();
        if(query.empty){
            //if doesn't exists create the course
            const res = await collectionRef.doc().set(request.body);
            response.json({message:"course created"}).status(200);
        }else{
            //if already exists send error message
            response.json({message:"course with the particular course code already exists"}).status(409);
        }

    }catch(error){
        response.json({message:error.message}).status(400);
    }
})

module.exports = router;