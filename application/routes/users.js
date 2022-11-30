var express = require('express');
var router = express.Router();
const db = require("../conf/database");
const bcrypt = require('bcrypt');

router.post("/register", function(req, res, next){
    const {username, email, password} = req.body;
    
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
                return bcrypt.hash(password, 2);
            }
            else{
                throw new Error("email already exists");
            }       
    }).then(function(hashedPassword){
        return db.execute('insert into users (username, email, password) value (?,?,?)', [username, email, hashedPassword]);//the items in the array are the items added into the value of the columns in mysql
    })
    
    .then(function([results, fields]) {
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
});



router.post("/login", function(req, res, next){
    const {username, password} = req.body;
    db.query('select id, username, email from users where username=? and password=?', [username, password])
        .then(function([results, fields]){
            if (results && results.length == 1){
                res.redirect("/");
            }
            else{
                throw new Error("Invalid user credentials");
            }
        })
        .catch(function(err){
            next(err);
        });
});

module.delete("/login");

module.exports = router;
