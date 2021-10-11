const db = require("./db");

// register models
const Article = require("./models/Article");
const User = require("./models/user");

module.exports = {
  db,
  models: {
    Article,
    User
  }
};
