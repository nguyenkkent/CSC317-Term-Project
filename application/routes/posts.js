var express = require("express");
var router = express.Router();
const db = require('../conf/database');
const multer = require("multer");
const sharp = require("sharp");
const { isLoggedIn } = require("../middleware/protectors");
const { getPostsById, getRecentPosts } = require("../middleware/posts");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
    }
});

const upload = multer({ storage: storage });

router.post("/create", isLoggedIn, upload.single("uploadImage"), function (req, res, next) {
    let uploadedFile = req.file.path;//assertion: file object exists
    let thumbnailName = `thumbnail-${req.file.filename}`
    let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;
    const { title, description } = req.body //.body contains key-value pairs of data submitted in the request body. title and description here are keys.
    const userId = req.session.userId;

    sharp(uploadedFile)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(function () {
            let baseSQL = `INSERT INTO posts (title, description, image, thumbnail, fk_authorId) values (?,?,?,?,?)`;
            return db.execute(baseSQL, [title, description, uploadedFile, destinationOfThumbnail, userId]);
            //remember that each promise needs to either error out or respond (res) then a return is needed;
        })
        .then(function ([results, fields]) {
            if (results && results.affectedRows == 1) {//if results exists and &7 results.affectedRows exists
                req.flash("success", "your post has been created!");
                req.session.save(function (saveErr) {
                    res.redirect("/");//we have to save because the redict will happen much faster than the save will. save is async so we don't have to wait for that before redict
                })
            }
        })
        .catch(err => next(err));
});

router.get("/search", getRecentPosts, function (req, res, next) {
    let searchTerm = `%${req.query.searchTerm}%` //the % is a regex so %stuff can locate for example SOMEstuff
    let originalSearchTerm = req.query.searchTerm;
    let baseSQL = `select id, title, description, thumbnail, concat_ws(" ", title, description) as haystack
  from posts
  having haystack like ?;`
    //display columns id, title, description, thumnnail, contatentate title+description (display as haystack)
    //from posts and haystack matches ?
    db.execute(baseSQL, [searchTerm])
        .then(function ([results, fields]) {
            res.locals.searchTerm = originalSearchTerm;
            if (results.length == 0){
                req.flash("error", `${results.length} found, displaying recent posts`);
                req.session.save(function(saveErr){
                res.render("index");
                })
            }
            else{
                res.locals.results = results; //this creates a var results out of the results array from the db.execute
                req.flash('success', `${results.length} results found`)
                console.log(req);
                req.session.save(function(saveErr){
                    res.render("index");
                })                
            }
        })
        .catch(err => next(err));

});
module.exports = router;