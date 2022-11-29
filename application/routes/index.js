var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 317 App', name:"Kent Nguyen" });
});

router.get("/login", function(req, res) {
    res.render('login');
});

router.get("/PostImage", function(req, res) {
    res.render('PostImage')
});

router.get("/Registration", function(req, res) {
    res.render('Registration', /* {js:["Registration.js"]} */)
});

//don't forget about ViewPost route?
router.get("/ViewPost", function(req, res) {
    res.render('ViewPost')
});

module.exports = router;
