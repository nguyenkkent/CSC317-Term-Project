var express = require('express');
var router = express.Router();
const db = require("../conf/database")

/* 
try do move this route to posts.js and use /comment instead
*/
router.post("/create", function(req, res, next){
    console.log(req.body);
    res.json(req.json);
});

module.exports = router;