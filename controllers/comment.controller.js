const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const createComment = async (req, res, next) => {
    const { commentedInput, postId } = req.body;
    const userID = req.userID;

    try {
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = await Comment.create({ commentedInput, commentedBy: userID, postId });

        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

        res.status(201).json({ success: true, message: "Comment created successfully", newComment });
    } catch (error) {
        next(error);
    }
};

const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({}).populate("commentedBy", "name",);

        res.status(200).json({ success: true, message: "Comments fetched successfully", comments });
    } catch (error) {
        next(error);
    }
};

const getCommentbyId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        res.status(200).json({ success: true, message: "Comment fetched successfully", comment });
    } catch (error) {
        next(error);
    }
};


const getCommentbyPostId = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const comments = await Comment.find({ postId: id }).populate("commentedBy");
        if (!comments.length) {
            return res.status(404).json({ success: false, message: "No comments found for this post" });
        }
        res.status(200).json({ success: true, message: "Comments fetched successfully", comments });
    } catch (error) {
        next(error);
    }
};


const updateComment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        res.status(200).json({ success: true, message: "Comment updated successfully", comment });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    const { id } = req.params;
    try {

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: id } });

        await Comment.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createComment,
    getComment,
    updateComment,
    deleteComment,
    getCommentbyId,
    getCommentbyPostId
};
