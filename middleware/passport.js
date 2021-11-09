const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controller/userController");
const process = require("process");
const dots = require("dotenv").config();

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    console.log("localLogin called...");
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const GitHubLogin = new GitHubStrategy(
  {
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      let user = userController.getUserByGitHubIdOrCreate(profile.id);
      return done(null, user);
    });
  }
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser called...");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser called...");
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
module.exports = passport.use(GitHubLogin);
