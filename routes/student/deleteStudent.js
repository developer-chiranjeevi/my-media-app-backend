const express = require("express");
const firestore = require('../../firebase.js').firestore;
const router = express.Router();

router.delete('/',async(request,response) =>{
    const rollNo = request.body.roll_no;
    try{
        //checking weather a perticular user exists or not
        const collectionRef = firestore.collection('STUDENT-PROFILE');
        const query = await collectionRef.where("roll_no","==",rollNo).get();
        if(!query.empty){
            //if user exists delete user
            query.forEach((doc) => {
                const res = firestore.collection('STUDENT-PROFILE').doc(doc.id).delete();
                response.json({message:"student profile deleted"}).status(200);
            
            });    
        }else{
            //if user doesn't exists send error message
            response.json({message:"student with the particular roll number doesn't exists"}).status(409);
        }
    }catch(error){
        response.json({message:error.message}).status(400);
    }
});



module.exports = router;