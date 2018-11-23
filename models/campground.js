var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// Schema setup
var campgroundSchema = new Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, { usePushEach: true });

module.exports = mongoose.model("campground", campgroundSchema);