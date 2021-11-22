const database = require("../models/userModel").Database;
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    // console.log(database);
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // console.log("loginSubmit called...");
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res);
  },

  registerSubmit: (req, res) => {
    // console.log("registerSubmit called...");
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
    // console.log("gitLogin called...");
    passport.authenticate("github", {
      scope: ["user:email"],
    })(req, res);
  },

  gitCallBack: (req, res) => {
    // console.log("gitCallBack called...");
    passport.authenticate("github", {
      failureRedirect: "/login",
      successRedirect: "/reminders",
    })(req, res);
  },

  admin: (req, res) => {
    // res.render("auth/admin");//path to admin ejs page
    revokeSession = () => {
      console.log("revokeSession called...");
      // sessionStorage.removeItem(req.user.id);
      req.session.destroy(function(err){
        if (err) {
          console.log(err)
        }else{
          res.redirect('/')
          console.log("You have removed session");
        }
      })
    };

    for (let [key, value] of Object.entries(req.sessionStore.sessions)) {
      console.log(key, value);
      res.write("<h1> Dashboard </h1>");
      res.write("<p> Current Active Sessions: </p>");
      res.write("<p>SessionID: " + key + "</p>");
      // Still needs to get user id
      res.write("<p>UserID: " + req.session.passport["user"] + "</p>");
      res.write(
        '<input type="button" onclick="revokeSession()" value="Revoke Session">'
      );
    }

    // res.write("<h1> Dashboard </h1>");
    // res.write("<p> Current Active Sessions: </p>");
    // res.write("<p>SessionID: " + req.sessionID + "</p>");
    // res.write("<p>UserID: " + req.user.id + "</p>");
    // res.end('<a href=' + '/' + '>Revoke Session </a>')

    console.log(req.sessionStore.sessions); //current sessions
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
};

module.exports = authController;
