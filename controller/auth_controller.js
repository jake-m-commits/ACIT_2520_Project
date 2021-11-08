const database = require("../models/userModel").Database;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    console.log(database);
    // makes it easier to see what is happening in the background
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
    console.log("registerSubmit called...");
    let newUser = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
    };
    database.push(newUser);
    console.log(database); // just to verify that new users are good
    res.redirect("/login");
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
};

module.exports = authController;
