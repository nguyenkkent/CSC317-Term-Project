//middleware functions need to be hooked up.

const db = require("../conf/database");

//exports these key-value objects
module.exports = {

    getRecentPosts : function(req, res, next){
        db.query("select id, title, description, thumbnail from posts order by createdAt desc limit 8")
        .then(function([results,fields]){
            if(results && fields.length){
                res.locals.results = results;
            }
            next(); //call next outside of if statement so that posts will load if empty
        })
        .catch(err => next(err));    
    },

    getPostsById : function(req, res, next){
        let postId = req.params.id;
        let baseSQL = `select p.id, p.title, p.description, p.image, p.createdAt, u.username
        from posts p
        join users u
        on p.fk_authorId = u.id
        where p.id = ?`;
        //searching for columns title, description, image, created at, and username from table posts and users where post's fk_authoriId == users' Id using posts' Id
        db.query(baseSQL, [postId])
        .then(function([results, fields]){
            if( results && results.length == 1){
                res.locals.currentPost = results[0]; //we assign currentPost to the value at index 0. The .currentPost is a var that is created just now               
            }
            else{//no rows means post does not exists   
                req.flash("error", "no results");
            }
            next();
        });
    },

}//end of module.exports


