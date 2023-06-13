const express = require('express');
const router = express.Router();
const firestore = require('../../firebase').firestore;




router.get("/",async(request,response) => {
    let docId;
    let data = [];
    try{    

        //creating a reference to the student profile collection
        const studentCollection = firestore.collection("STUDENT-PROFILE");
        const studentQuery = await studentCollection.where("roll_no","==",request.body.roll_no).get();
        if(!studentQuery.empty){
           //fetching document ID of the paticular student
            studentQuery.forEach((doc) =>{
                docId = doc.id;
            });
            //creating reference to the submissions sub-collection
            const res = await studentCollection.doc(docId).collection("SUBMISSIONS").get();
            res.forEach((doc) =>{
                data.push(doc.data());
            });
            response.json({submissions:data}).status(200);

        }else{
            response.json({message:"invalid roll number"}).status(404);
        }


    }catch(error){
        response.json({message:error.message});
    }
});


module.exports = router;