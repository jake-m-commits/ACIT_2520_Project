let remindersController = {
  list: (req, res) => {
    console.log(req.user);
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    //console.log(req);
    //console.log(req.params.id);
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    //console.log(searchResult);
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    //console.log(req.user.reminders);
    let searchResult = req.user.reminders.find(function (reminder) {
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
    let index = req.user.reminders.findIndex(
      (obj) => obj.id === reminderUpdated.id
    );
    req.user.reminders[index] = reminderUpdated;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Note: app.post("/reminder/delete/:id", reminderController.delete);
    let reminderId = req.params.id;
    let indexOfReminder = req.user.reminders.findIndex(
      (obj) => obj.id === Number(reminderId)
    );
    req.user.reminders.splice(indexOfReminder, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
