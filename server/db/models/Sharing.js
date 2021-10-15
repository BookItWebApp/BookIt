const Sequelize = require('sequelize');
const db = require('../db');

const Sharing = db.define('sharing', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  userMessage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Sharing;
