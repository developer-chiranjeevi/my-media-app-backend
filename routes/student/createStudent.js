const express = require('express');
const router = express.Router();
const firestore = require('../../firebase.js').firestore;



router.post('/',createProfile,(request,response) =>{
});

async function createProfile(request,response,next){
    const rollNo = request.body.roll_no
    const collectionRef = firestore.collection('STUDENT-PROFILE');
    
    try{
        //finding wheather a user with the particular roll no exists already
        const snapShot = await collectionRef.where('roll_no',"==",rollNo).get();
        if(snapShot.empty){
            //if not exists create a user
            try{
                const data = request.body;
                const res = await firestore.collection('STUDENT-PROFILE').doc().set(data);
                response.json({message:res}).status(200);
            }catch(error){
                response.status(400).json({message:error.message});
                
            };
            next();
        }else{
            //if exists send error message
            response.json({message:"student with the following roll number already exists"}).status(409);
        }
    } catch(error){
        response.json({message:error.message}).status(400);
        next();
    }    
};


module.exports = router;