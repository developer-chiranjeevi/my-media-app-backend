const express = require("express");
const router = express.Router();
const firestore = require("../../firebase").firestore;



router.post('/',async(request,response) =>{
    //creating a reference to the assignments collection
    const collectionRef = firestore.collection("ASSIGNMENT");
    //checking weather the following course exists
   try{
        //checking weather the follow course exists
        const courseRef = firestore.collection("COURSE");
        const couresQuery = await courseRef.where("course_id","==",request.body.course_id).get();

        if(couresQuery.empty){
            //if course not exists
            response.json({message:"invalid course ID"}).status(400);
        }else{
            //creating a reference to the assignment collection in order to find out the no.of assignments
            const assignmentRef = await firestore.collection("ASSIGNMENT");
            const assignmentQuery = await assignmentRef.where("course_id","==",request.body.course_id).get();
            //if course exists
            //checking weather the assignment with the following ID exists or not
            const query = await collectionRef.where("assignment_id","==",`${request.body.course_id}a${assignmentQuery.docs.length}`).get();
            if(query.empty){            

                const res = await collectionRef.doc().set(
                    {
                        name:request.body.name,
                        assignment_id:`${request.body.course_id}a${assignmentQuery.docs.length}`,
                        course_id:request.body.course_id,
                        scores:request.body.scores,
                        due_date:request.body.due_date,
                    }
                );
                response.json({message:"assignment created"}).status(200);
            }else{
                response.json({message:"assignment with the following assignment ID already Exists"}).status(409);
            }
        }
        
   }catch(error){
        response.json({message:error.message});
   }
   
});


module.exports = router;