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
    let reminderUpdated = {
      id: parseInt(reminderToFind),
      title: req.body.title,
      description: req.body.description,
      completed: Boolean(req.body.completed),
    };
    let index = database.cindy.reminders.findIndex(
      (obj) => obj.id === reminderUpdated.id
    );
    //console.log(obj.id);
    //console.log(reminderUpdated.id);
    //console.log(obj.id === reminderUpdated.id);
    //console.log(index);
    console.log(req.body.completed);
    database.cindy.reminders[index] = reminderUpdated;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    // Note: app.post("/reminder/delete/:id", reminderController.delete);
    let reminderToDelete = req.params.id;
    let searchReminder = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    database.cindy.reminders.splice(searchReminder);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
