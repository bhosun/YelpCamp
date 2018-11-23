var mongoose = require("mongoose");
var Campground  = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
        name: "Cloud's rest",
        image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
        description: "lorem kjdnemkwmkmkwnd j vm jdnkmwkmknjjfjfjfjfjfjfnvnknjvnfnvjfnvfbvebuefeifijieimwnnwdnwnnfenfnunfe ejne"
    },
    {
        name: "Farm's rest",
        image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
        description: "lorem kjdnemkwmkmkwnd j vm jdnkmwkmknjjfjfjfjfjfjfnvnknjvnfnvjfnvfbvebuefeifijieimwnnwdnwnnfenfnunfe ejne"
    },
    {
        name: "fog rest",
        image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg",
        description: "lorem kjdnemkwmkmkwnd j vm jdnkmwkmknjjfjfjfjfjfjfnvnknjvnfnvjfnvfbvebuefeifijieimwnnwdnwnnfenfnunfe ejne"
    }
]

function seedDB(){
    // remove all cgs
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
    console.log("REmoved cg");
     //   add a few cgs
     data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err){
                console.log(err);
            } else {
                console.log("added a cg");
                // Create a comment
                Comment.create(
                    {
                        text: "This place is great",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                       campground.comments.push(comment);
                       campground.save();
                       console.log("Created new comment");
                        }
                    });
            }
        });
     });
  });
    // add a few comments
}

module.exports = seedDB;