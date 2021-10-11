const Sequelize = require("sequelize");
const db = require("../db");

const UserArticle = db.define(
  "userArticle",
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    featured: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    readAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "articleId"],
      },
    ],
  }
);

module.exports = UserArticle;
