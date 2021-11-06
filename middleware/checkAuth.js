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
};
