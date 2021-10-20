const Sequelize = require('sequelize');
const db = require('../db');

/**
 * @typedef {import ('sequelize').Model} Model
 */

/**
 * @typedef {Object} Author
 * @property {string?} id
 * @property {string} name
 * @property {string?} bio
 * @property {string?} photoUrl
 * @property {Date} createdAt
 * @property {Object[]?} articles
 */
const Author = db.define('author', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  photoUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Author;
