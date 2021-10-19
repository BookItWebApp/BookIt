const router = require('express').Router();
const {
  models: { Article, UserArticle, Tag, Tagging },
} = require('../db/index');

const getallArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (error) {
    next(error);
  }
};

// POST /api/articles
const postArticle = async (req, res, next) => {
  try {
    console.log('POST ARTICLE BODY: ', req.body);

    const url = req.body.article.url;
    const articleName = req.body.article.name;
    const isPrivate = req.body.article.isPrivate;
    const userId = req.body.userId;
    const tagsArr = req.body.article.tags;

    // CREATE ARTICLE
    const article = await Article.create({
      url: url,
    });
    console.log('ARTICLE IS CREATED: ', article);

    // CREATE USER ARTICLE
    const userArticle = await UserArticle.create({
      name: articleName,
      userId: userId,
      articleId: article.id,
      isPrivate: isPrivate,
    });
    console.log('=> USER_ARTICLE IS CREATED: ', userArticle);

    // // CREATE TAGS/TAGGING
    await Promise.all(
      tagsArr.map(async (tagName) => {
        let tag = await Tag.create({
          name: tagName,
        });
        console.log('=> TAGS IS CREATED: ', tag);
        return await Tagging.create({
          tagId: tag.id,
          userArticlesId: userArticle.id,
        });
      })
    );

    const createdArticle = await UserArticle.findByPk(userArticle.id, {
      include: [
        {
          model: Article,
          attributes: ['id', 'url'],
        },
        {
          model: Tagging,
          include: {
            model: Tag,
          },
        },
      ],
    });
    console.log('ARTICLE TO SEND > ', createdArticle);

    res.json(createdArticle);
  } catch (error) {
    console.log('CREATE ARTICLE ERR: ', error);
    next(error);
  }
};

router.get('/', getallArticles);
router.post('/', postArticle);

module.exports = router;
