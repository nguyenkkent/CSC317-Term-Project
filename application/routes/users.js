var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//localhost:3000/users/register
router.post("/register", function(req, res){
    console.log(req.body);
    res.send();
});

// router.post("/login", function(req, res){

// });

module.exports = router;
