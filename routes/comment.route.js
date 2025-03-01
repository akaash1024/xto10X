const isAuthenicated = require("../middlewares/isAuthenicated.middleware");

const commentRoute = require("express").Router();
const commentController = require("../controllers/comment.controller")




commentRoute.route("/create/").post(isAuthenicated, commentController.createComment)

commentRoute.route("/").get(commentController.getComment)
commentRoute.route("/:id").get(commentController.getCommentbyId)

commentRoute.route("/update/:id").patch(isAuthenicated, commentController.updateComment)
commentRoute.route("/delete/:id").delete(isAuthenicated, commentController.deleteComment)


module.exports = commentRoute;


