var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if (req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
              if(err){
                  req.flash("error", "campgrround not found");
                  res.redirect("back");
              } else {
                  //    does user own cg?
                  if(foundCampground.author.id.equals(req.user._id)){
                     next();
                  } else {
                      req.flash("error", "You dont have permission to do that");
                     res.redirect("back");
                  }   
                }
              });
          } else {
              req.flash("error", "You need to be logged in to do that");
              res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
        if (req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err){
                  res.redirect("back");
              } else {
                  //    does user own comment
                  if(foundComment.author.id.equals(req.user._id)){
                     next();
                  } else {
                      req.flash("error", "you dont have permission to do that");
                     res.redirect("back");
                  }   
                }
              });
          } else {
              req.flash("error", "you need to be logged in to do that");
              res.redirect("back");
          }
}

middlewareObj.isLoggedIn = function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
}

module.exports = middlewareObj;