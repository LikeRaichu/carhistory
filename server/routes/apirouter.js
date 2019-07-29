var express = require('express');

module.exports = function () {
   var router = express.Router();

   router.get('/List', (req, res) => {
       res.json(sampleCarList);
   });

//    router.post('/SignUp', (req, res) => {
        
//     console.log(req.body);
//     res.json(userList);

//    });

   return router;
}