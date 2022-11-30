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
    })
    .then(function([results, fields]) {//email doesn't exist
        if (results && results.length == 0){ 
            return bcrypt.hash(password, 2);
        }
        else{
            throw new Error("email already exists");
        }       
    })
    .then(function(hashedPassword){
        return db.execute('insert into users (username, email, password) value (?,?,?)', [username, email, hashedPassword]);//the items in the array are the items added into the value of the columns in mysql
    })
    .then(function([results, fields]) {
        if (results && results.affectedRows == 1){
            res.redirect("/login");
        }
        else{
            throw new Error("user could not be made");
        } 
    })
    .catch(function(err){
        res.redirect("/Registration");
        next(err);
    });
});


router.post("/login", function(req, res, next){
    const {username, password} = req.body;
    let loggedUserId;//these will be accessible in the later callback functions due to closure
    let loggedUsername;
    db.query('select id, username, password from users where username=?', [username])
        .then(function([results, fields]){
            if (results && results.length == 1){
                let dbPassword = results[0].password; // since results return an array of rows matching username we select the only user at index 0 and their .password property
                //assertion: username is found(since row==1 after query)
                loggedUserId = results[0].id;//assign values to declared variable in the outer function.
                loggedUsername = results[0].username;
                return bcrypt.compare(password, dbPassword);
            }
            else{
                throw new Error("Invalid user credentials");
            }
        })
        .then(function(passwordMatched){
            if (passwordMatched){
                req.session.userId = loggedUserId;//this will create a new session and log in user after correct password
                req.session.username = loggedUsername;
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

router.delete("/login");

module.exports = router;
