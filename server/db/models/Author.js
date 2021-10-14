const Sequelize = require('sequelize');

const Author = db.define('author', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  photoUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Author;
