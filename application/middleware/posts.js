const db = require("../conf/database");
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
    }
}