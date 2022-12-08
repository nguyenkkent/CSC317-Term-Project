var express = require('express');
var router = express.Router();
//middleware needs to be hooked up the routes
const {isLoggedIn} = require("../middleware/protectors");
const {getRecentPosts, getPostsById, getCommentsForPostById} = require("../middleware/posts");

//the getRecentPosts middleware here populates the page with recent posts
router.get('/', getRecentPosts, function(req, res, next) {
    res.render('index', { title: 'CSC 317 App', name:"Kent Nguyen" });
});

router.get("/login", function(req, res) {
    res.render('login');
});

router.get("/registration", function(req, res) {
    res.render('registration' )
});

// router.get("/Registration", function(req, res) {
//     res.render('Registration', {js:["Registration.js"]} )
// });

router.get("/viewpost", function(req, res) {
    res.render('viewpost')
});

router.get("/postimage", isLoggedIn, function(req, res) {//if a path matches /PostImage then isLoggedIn is ran before the anon function after it.
    res.render('postimage')
});

router.get("/posts/:id(\\d+)", getPostsById, getCommentsForPostById ,function(req, res){
    res.render("viewpost", {js: ["viewpost.js"]} )
});



module.exports = router;
