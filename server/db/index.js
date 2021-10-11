const db = require("./db");

// register models
const Article = require('./models/Article')


module.exports = {
  db,
  models: {
    Article
  }}
