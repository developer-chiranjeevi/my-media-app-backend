const express = require('express');
const router = express.Router();



router.get('/',(request,response) =>{
    response.json({message:"Welcome To My Media App"})
});


module.exports = router;