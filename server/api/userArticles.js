//ROUTES FOR A SINGLE USERS ARTICLES
const router = require("express").Router();
const {
  models: { UserArticle, Article, Tagging, Tag },
} = require("../db");

module.exports = router;

//Retrieve all articles from UserArticle Table
router.get("/", async (req, res, next) => {
  try {
    const allArticles = await UserArticle.findAll({
      include: [
        {
        model: Article,
        attributes: ["id","url"]},
        {
        model: Tagging,
        include: {
           model: Tag,
            }
          }]
      })
    res.json(allArticles)
  } catch (err) {
    next(err);
  }
})

//Retrieve all of a single user's articles
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userArticles = await UserArticle.findAllByUser(id);
    res.json(userArticles);
  } catch (err) {
    next(err);
  }
});

//Add new article UserArticle Table
router.post("/", async (req, res, next) => {
  try {
    const { name, userId, articleId, featured } = req.body;
    const userArticles = await UserArticle.create({
      name: name,
      userId: userId,
      articleId: articleId,
      featured: featured,
    });
    res.json(userArticles);
  } catch (err) {
    next(err);
  }
});
