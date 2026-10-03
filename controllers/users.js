const User = require("../models/user")


module.exports.signUpForm = (req, res) => {
  res.render("user/signUp.ejs");
}

module.exports.signUpUser = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to WanderLust");
        res.redirect(`/listings`);
      }
    });
  } catch (err) {
    req.flash("error", "User Already Existed ! ");
    res.redirect("/signUp");
  }
}

module.exports.loginForm = (req, res) => {
  res.render("user/login.ejs");
}

module.exports.loginUser = (req, res) => {
    req.flash("success", "Login SuccessFull");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }

  module.exports.logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "You are Logged Out");
      res.redirect("/listings");
    }
  });
}

module.exports.profile = (req, res) => {
  res.render("user/profile.ejs");
}