const Post = require("../models/post.model");
const User = require("../models/user.model");

const createPost = async (req, res, next) => {
    const { title, description, } = req.body
    const userID = req.userID;
    try {
        const newPost = await Post.create({ title, description, createdBy: userID })

        await User.findByIdAndUpdate(userID, { $push: { posts: newPost._id } });

        res.status(201).json({ success: true, message: "Post creataed successfully", newPost })
    } catch (error) {
        next(error);
    }
}

const getPost = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ _id: -1 })
            .populate("commentRef")
            .populate("createdBy", "name");

        res.status(200).json({ success: true, message: "Posts fetched successfully", posts });
    } catch (error) {
        next(error);
    }
};


const getPostbyId = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await Post.findById({ _id: id })
            .populate("commentRef")
            .populate("createdBy", "name")
        res.status(200).json({ success: true, message: "Post fetched successfully", post })
    } catch (error) {
        next(error);
    }
}
const updatePost = async (req, res, next) => {
    const { id } = req.params

    try {
        const post = await Post.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json({ success: true, message: "Post updated successfully", post })

    } catch (error) {
        next(error);
    }
}
const deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        await User.findByIdAndUpdate(post.createdBy, { $pull: { posts: post._id } });

        await Post.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPostbyId
}