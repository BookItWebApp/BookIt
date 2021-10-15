const router = require('express').Router();
const {
  models: { Article },
} = require('../db/index');

const getallArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (error) {
    next(error);
  }
};

const postArticle = async (req, res, next) => {
  try {
    const [article, created] = await Article.findOrCreate({
      where: { url: req.body.url },
    });
    if (created) {
      res.send(article).status(204);
    } else {
      res.send(article);
    }
  } catch (error) {
    next(error);
  }
};

router.get('/', getallArticles);
router.post('/', postArticle);

module.exports = router;
