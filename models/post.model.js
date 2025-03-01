const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: { type: String, },
    description: { type: String, },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Comment"
        }
    ]
}, {
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}

)

postSchema.virtual("commentRef", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
