module.exports = {
  /* ensureAuthenticated is called back in index.js
   * I will look more at this redirecting next time. */

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
