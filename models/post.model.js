const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {type: String, },
    description: {type: String, },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Comment"
        }
    ]
})



postSchema.virtual("commentRef", {
    ref: "Comment",
    localField: "comments",
    foreignField: "_id"
  })


const Post = mongoose.model("Post", postSchema);

module.exports = Post;
