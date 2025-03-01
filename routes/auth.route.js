const authRoute = require("express").Router()
const authController = require("../controllers/auth.controller");
const isAuthenicated = require("../middlewares/isAuthenicated.middleware");


authRoute
  .route("/register")
  .post(authController.register);

authRoute
  .route("/login")
  .post(authController.login); 


authRoute.
  route("/user").
  get(isAuthenicated, authController.user);
  

  


module.exports = authRoute;