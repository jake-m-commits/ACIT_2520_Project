//const database = require("../models/userModel");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("loginSubmit called...");
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res); // This is odd and needs some looking into.
  },

  registerSubmit: (req, res) => {
  },

logout: (req, res) => {
  req.logout();
  res.redirect("/index.html");
  }
};

module.exports = authController;
