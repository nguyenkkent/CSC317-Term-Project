var express = require('express');
var router = express.Router();
const db = require("../conf/database")

/* 
try do move this route to posts.js and use /comment instead
*/
router.post("/create", function(req, res, next){
    if (!req.session.userId){
        res.json({
            status : "error",
            message : "You must be logged in"
        })
        // req.flash("error", "you must be logged in to post") //not working
        // req.session.save(function(saveErr){
        //     res.redirect("/");
        // })
    }
    else{
        let {comment, postId} = req.body; 
        let {userId, username } = req.session; //these names inside the {} must already exists in session object. users.js line 71 and 72 was where the assignment happened
        let baseSQL = `INSERT INTO comments (text, fk_authorId, fk_postId) value (?,?,?);`;
        db.execute(baseSQL, [comment, userId, postId])
        .then(function([results, fields]){
            if(results && results.affectedRows == 1){
                res.json({
                    status : "Success",
                    message : "Your comment was created",
                    data : {
                        comment : comment,
                        username : username,
                        commentId : results.insertId
                    }
                })
                // req.flash("Success", "Post created"); //not working
                // req.session.save(function(saveErr){
                //     res.redirect("/");
                // })
            }
            else{
                res.json({
                    status : "error",
                    message : "Comment could not be created"
                })
            }
        })
        
    }
});

module.exports = router;