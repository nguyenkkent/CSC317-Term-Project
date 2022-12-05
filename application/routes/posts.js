var express = require("express");
var router = express.Router();
const db = require('../conf/database');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
     
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  

router.post("/create", function(req, res, next){
    console.log(req);
    res.send();
});


module.exports = router;