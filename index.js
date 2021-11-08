const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 3001;
const authController = require("./controller/auth_controller");
const reminderController = require("./controller/reminder_controller");
//const userController = require("./controller/userController");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("./middleware/checkAuth");
const { allowedNodeEnvironmentFlags } = require("process");
//const authRoute = require("./routes/authRoute");
//const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true })); //was false
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("-".repeat(40));
  console.log(`User details are: `);
  console.log(req.body);
  console.log("Entire session object:");
  console.log(req.session);
  console.log(`Session details are: `);
  console.log(req.session.passport);
  console.log("-".repeat(40));
  next();
});

// Routes start here
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
app.post("/reminder/", ensureAuthenticated, reminderController.create);
app.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);
app.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);

//app.use("/", indexRoute);
//app.use("/auth", authRoute);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", forwardAuthenticated, authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", forwardAuthenticated, authController.registerSubmit);
app.post("/login", forwardAuthenticated, authController.loginSubmit);
app.get("/logout", authController.logout)
//app.post(
//  "/login",
//  passport.authenticate("local", {
//    successRedirect: "/loginSubmit",
//    failureRedirect: "/login",
//  })
//);

app.listen(port, function () {
  console.log(`🚀 Server has started on port ${port}`);
});
