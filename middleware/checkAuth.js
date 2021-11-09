module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log("ensureAuthenticated called...");
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    console.log("forwardAuthenticated called...");
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
  isAdmin: (req, res, next) => {
    console.log("isAdmin called...");
    if (req.isAuthenticated() && req.user.role === "admin") {
      return next();
    }
    res.redirect("/login");
  },
};
