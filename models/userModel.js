let Database = [
  {
    id: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy123!",
    reminders: [
      { id: 1, title: "abc", description: "abcabc", completed: false },
    ],
  },
  {
    id: 2,
    name: "Alex",
    email: "alex@gmail.com",
    password: "alex123!",
    reminders: [],
  },
];

const userModel = {
  findOne: (email) => {
    const user = Database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = Database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { Database, userModel };
