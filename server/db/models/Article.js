//Articles DB
const Sequelize = require('sequelize');
const db = require('../db');

//Articles must be unique, not empty or null, and must be URL
const Article = db.define('article', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUrl: true,
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = Article;
