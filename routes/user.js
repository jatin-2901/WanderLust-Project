const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../util/middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signUp")
  .get(userController.signUpForm)
  .post(userController.signUpUser);

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser,
  );

//logOut Route
router.get("/logOut", userController.logOutUser);

router.get("/profile", isLoggedIn,  userController.profile);

module.exports = router;
