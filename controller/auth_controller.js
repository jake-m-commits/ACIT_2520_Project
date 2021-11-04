//const database = require("../models/userModel");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("test");
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "auth/login",
    });
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
