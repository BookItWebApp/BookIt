//ROUTES FOR A SINGLE USERS ARTICLES
const router = require("express").Router();
const {models: { UserArticle },} = require("../db");

module.exports = router;

//Retrieve all of a user's articles
router.get("/", async (req, res, next) => {
  try {
    const  id  = req.query.userId;
    const articles = await UserArticle.findAllByUser(id);
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

