module.exports ={
    isLoggedIn : function(req, res, next){
        if(req.session.username){
            next();
        }
        else{
            req.flash("error", "You nust ve logged in to post");
            req.session.save(function(saveError){
                res.redirect("/login");
            })            
        }
    }
};