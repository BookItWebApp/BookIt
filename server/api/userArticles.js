//ROUTES FOR A SINGLE USERS ARTICLES
const router = require("express").Router();
const {
  models: { UserArticle, Article },
} = require("../db");

module.exports = router;

//Retrieve all of a user's articles (just articles)
router.get("/", async (req, res, next) => {
  try {
    const id = req.query.userId;
    const articles = await UserArticle.findAllByUser(id);
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

//Retrieve all of a user's articles with metadata
router.get("/meta", async (req, res, next) => {
  try {
    const id = req.query.id;
    const response = await UserArticle.findAllByUser(id);
    console.log('articles query', response)
    const articlemetaData = response.map((url)=>{url.metaData()})
    res.json(articlemetaData);
  } catch (err) {
    next(err);
  }
});
