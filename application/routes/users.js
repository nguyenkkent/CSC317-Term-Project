var express = require('express');
var router = express.Router();
const db = require("../conf/database");

// router.post("/register", function(req, res){
//     console.log(req.body);
//     res.send("/r register route is working");
// });


router.post("/register", function(req, res){
    const {username, email, password} = req.body;
    
    //server side validation
    //check for duplicates
    db.query('select id from users where username=?',[username])
    .then(function([results, fields]) {
        if (results && results.length == 0){ //username doesn't exist
            return db.query('select id from users where email=?', [email]);
        }
        else{
            throw new Error("username already exists");
        }
    }).then(function([results, fields]) {//email doesn't exist
            if (results && results.length == 0){ 
                return db.execute('insert into users (username, email, password) value (?,?,?)', [username, email, password]);
            }
            else{
                throw new Error("email already exists");
            }       
    }).then(function([results, fields]) {
        if (results && results.affectedRows == 1){
            res.redirect("/login");
        }
        else{
            throw new Error("user could not be made");
        } 
    }).catch(function(err){
        res.redirect("/Registration");
        next(err);
    });
    //insert into db
    //respond
});



// router.post("/register", function(req, res){
//     const {username, email, password} = req.body;
    
//     //server side validation
//     //check for duplicates
//     db.query('select id from users where username=?',[username])
//     .then(function([results, fields]) {
//         if (results && results.length == 0){ //username doesn't exist
//             res.redirect("/login");
//         }
//         else{
//             throw new Error("username already exists");
//         }
//     }).catch(function(err){
//         next(err);
//     });
//     //insert into db
//     //respond
// });




// router.post("/register", function(req, res){
//     const {username, email, password} = req.body;
    
//     //server side validation
//     //check for duplicates
//     db.query('select id from users where username=?',[username])
//     .then(function([results, fields]) {
//         if (results && results.length == 0){ //username doesn't exist
//             return db.execute('insert into users (username, email) value (?,?)', [username, email]);
//         }
//         else{
//             throw new Error("username already exists");
//         }
//     }).catch(function(err){
//         res.redirect("/Registration");
//         next(err);
//     });
//     //insert into db
//     //respond
// });



router.post("/login", function(req, res){
});

module.exports = router;
