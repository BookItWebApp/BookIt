const Sequelize = require("sequelize");
const db = require("../db");
// const Tag = require("./Tag");
// const UserArticle = require("./UserArticle");

const Tagging = db.define(
    "tagging",
    {
        featured: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["tagId", "userArticlesId"]
            }
        ]
    }
);

module.exports = Tagging;
