var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    // Get all cg from db
    Campground.find({}, function(err, allcampgrounds){
     if(err){
         console.log(err);
     } else{
         res.render("campgrounds/index", {campgrounds: allcampgrounds});
     }
    });
});

// CREATE - add new cg to db
router.post("/", middleware.isLoggedIn , function(req, res){
    // get data from form and add to cg array
    var name = req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground= {name: name, image: image, description: desc, author: author}
    // campgrounds.push(newCampground);
    // Create a new cg and save to db
    Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err)
      } else{
          // redirect back to cg page
          res.redirect("/campgrounds");
      }
    });
});
// NEW show form to add db
router.get("/new", middleware.isLoggedIn,  function(req, res){
    res.render("campgrounds/new");
})

// SHOW route
router.get("/:id", function(req, res){
    // find the cg with provided id and render show page
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
          // render show template with the cg
         res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership , function(req, res){
     Campground.findById(req.params.id, function(err, foundCampground){
         
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership,  function(req, res){
        //    find and update
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
              if(err){
                  res.redirect("/campgrounds")
                  console.log(err)
              } else {
                  res.redirect("/campgrounds/" + req.params.id);
              }
        });
        // redirect
});

// destroy cg
router.delete("/:id", middleware.checkCampgroundOwnership , function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.redirect("/campgrounds");
     } else {
         res.redirect("/campgrounds");
     }
   });
});

module.exports = router;
