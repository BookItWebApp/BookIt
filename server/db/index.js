//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Article = require("./models/Article");
const UserArticle = require("./models/UserArticle");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Article,
    UserArticle,
  },
};
