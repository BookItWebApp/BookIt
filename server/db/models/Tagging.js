const Sequelize = require("sequelize");
const db = require("../db");

//Articles must be unique, not empty or null, and must be URL
const Tagging = db.define("tagging", {
    featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Tagging;
