const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").Database;

const getUserByEmailIdAndPassword = (email, password) => {
  // console.log("getUserByEmailIdAndPassword called...");
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserByGitHubIdOrCreate = (profile) => {
  // console.log("getUserByGitHubIdOrCreate called...");
  try {
    let user = userModel.findById(profile.id);
    return user;
  } catch (err) {
    console.log(err.message);
    console.log("Registering user in the database...");
    let newUser = {
      id: profile._json.id,
      name: profile.displayName,
      email: null,
      password: null,
      reminders: [],
      role: "user",
      profileImage: profile._json.avatar_url,
    };
    database.push(newUser);
    return newUser;
  }
};

const getUserById = (id) => {
  // console.log("getUserById called...");
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  // console.log("isUserValid called...");
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserByGitHubIdOrCreate,
  getUserById,
};
