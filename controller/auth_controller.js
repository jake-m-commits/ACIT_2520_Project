const database = require("../models/userModel").Database;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    console.log(database);
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
    })(req, res);
  },

  registerSubmit: (req, res) => {
    console.log("registerSubmit called...");
    let newUser = {
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
      role: "user",
      profileImage: null,
    };
    database.push(newUser);
    res.redirect("/login");
  },

  gitLogin: (req, res) => {
    console.log("gitLogin called...");
    passport.authenticate("github", {
      scope: ["user:email"],
    })(req, res);
  },

  gitCallBack: (req, res) => {
    console.log("gitCallBack called...");
    passport.authenticate("github", {
      failureRedirect: "/login",
      successRedirect: "/reminders",
    })(req, res);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
};

module.exports = authController;
