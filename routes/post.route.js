const postRoute = require("express").Router();
const postController = require("../controllers/post.controller");
const isAuthenicated = require("../middlewares/isAuthenicated.middleware");



postRoute.route("/create").post(isAuthenicated, postController.createPost)

postRoute.route("/").get(postController.getPost)
postRoute.route("/:id").get(postController.getPostbyId)

postRoute.route("/update/:id").patch(postController.updatePost)
postRoute.route("/delete/:id").delete(postController.deletePost)


module.exports = postRoute;

