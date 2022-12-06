var express = require('express');
var router = express.Router();
const {isLoggedIn} = require("../middleware/protectors");
const {getRecentPosts} = require("../middleware/posts");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
    res.render('index', { title: 'CSC 317 App', name:"Kent Nguyen" });
});

router.get("/login", function(req, res) {
    res.render('login');
});

router.get("/PostImage", isLoggedIn, function(req, res) {//if a path matches /PostImage then isLoggedIn is ran before the anon function after it.
    res.render('PostImage')
});


router.get("/Registration", function(req, res) {
    res.render('Registration' )
});

// router.get("/Registration", function(req, res) {
//     res.render('Registration', {js:["Registration.js"]} )
// });

//don't forget about ViewPost route?
router.get("/ViewPost", function(req, res) {
    res.render('ViewPost')
});

module.exports = router;
