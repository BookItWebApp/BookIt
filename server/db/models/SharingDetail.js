const Sequelize = require('sequelize');
const db = require('../db');

const SharingDetail = db.define('sharingDetail', {
  sharingId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  userArticlesId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

module.exports = SharingDetail;
