const express = require("express");
const router = express.Router();
const firestore = require("../../firebase").firestore;



router.delete('/',async(request,response) =>{
    try{
        //creating a reference to the assignment collection
        const collectionRef = await firestore.collection("ASSIGNMENT");
        const query = await collectionRef.where("assignment_id","==",request.body.assignment_id).get();

        if(query.empty){
            //if the particular course doesn't exists send error message
            response.json({message:"Invalid assignment ID"}).status(404);
        }else{
            //if course exists
            query.forEach((doc) =>{
                collectionRef.doc(doc.id).delete();
                response.json({message:"assignment deleted"}).status(200);
            })
        }

    }catch(error){
        response.json({message:error.message}).status(400);
    }
});


module.exports = router;