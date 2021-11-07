let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    if (req.body.completed === "false") {
      boolOption = false;
    } else {
      boolOption = true;
    }
    let reminderUpdated = {
      id: parseInt(reminderToFind),
      title: req.body.title,
      description: req.body.description,
      completed: boolOption,
    };
    let index = database.cindy.reminders.findIndex(
      (obj) => obj.id === reminderUpdated.id
    );
    database.cindy.reminders[index] = reminderUpdated;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Note: app.post("/reminder/delete/:id", reminderController.delete);
    let reminderId = req.params.id;
    let indexOfReminder = database.cindy.reminders.findIndex(
      (obj) => obj.id === Number(reminderId)
    );
    database.cindy.reminders.splice(indexOfReminder, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
