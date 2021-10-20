const Sequelize = require("sequelize");
const db = require("../db");
const Article = require("../models/Article");
const Tagging = require("../models/Tagging");
const Tag = require("../models/Tag");

const UserArticle = db.define(
    "userArticle",
    {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        featured: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        note: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        articleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        readAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        isPrivate: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["userId", "articleId"]
            }
        ]
    }
);

//MODEL METHODS
//Find all articles belonging to a particular user
UserArticle.findAllByUser = function (currentUserId) {
    return this.findAll({
        where: { userId: currentUserId },
        include: [
            {
                model: Article,
                attributes: ["id", "url"]
            },
            {
                model: Tagging,
                include: {
                    model: Tag
                }
            }
        ]
    });
};

UserArticle.findAllTaggingsByUser = function (currentUserId) {
    return this.findAll({
        attributes: [],
        where: { userId: currentUserId },
        include: [
            {
                model: Tagging,
                attributes: ["tagId"],
                include: {
                    attributes: ["name"],
                    model: Tag
                }
            }
        ]
    });
};

module.exports = UserArticle;
