const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 3001;
const authController = require("./controller/auth_controller");
const reminderController = require("./controller/reminder_controller");
const passport = require("./middleware/passport");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");

const {
  ensureAuthenticated,
  forwardAuthenticated,
  isAdmin,
} = require("./middleware/checkAuth");

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

app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Session info for debugging
// app.use((req, res, next) => {
//   console.log("=".repeat(40));
//   console.log(`User details are: `);
//   console.log(req.body);
//   console.log("Entire session object:");
//   console.log(req.session);
//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   console.log("=".repeat(40));
//   next();
// });

// IMAGE UPLOAD STARTER CODE
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

app.post("/reminders/uploads/", async (req, res) => {
  console.log("Uploading to imgur...");
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    console.log(url);
    req.user[profileImage] = url;
    res.json({ message: url.data.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("Error: ", error);
  }
});

// Reminder routes
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

// Registration + Login routes
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", forwardAuthenticated, authController.loginSubmit);
app.get("/logout", authController.logout);

// GitHub routes
app.get("/auth/github", authController.gitLogin);
app.get("/auth/github/callback", authController.gitCallBack);

// Admin routes
app.get("/admin", isAdmin, authController.admin);

app.listen(port, function () {
  console.log(`🚀 Server has started on port ${port}`);
});
