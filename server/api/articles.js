const router = require('express').Router();
const {
  models: { Article, UserArticle, Tag, Tagging, Author, User },
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
    const url = req.body.article.url;
    const articleName = req.body.article.name;
    const isPrivate = req.body.article.isPrivate;
    const userId = req.body.userId;
    const tagsArr = req.body.article.tags;

        // CREATE ARTICLE
        const article = await Article.create({
            url: url
        });

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

/**
 * Checks if the incoming request has an authorization header containing the
 * token of a user who is also an author
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateAuthor = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    req.author = await Author.findOne({ where: { userId: req.user.id } });
    if (req.author) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Sets one of the authors of the article in `req.params.id` as the currently
 * logged in user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const setAuthor = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: Author, attributes: ['id'] }],
    });
    if (!article) {
      res.sendStatus(404);
    } else {
      const authors = article.authors.map((author) => author.id);
      if (!authors.includes(req.author.id)) {
        article.addAuthor(req.author);
        await article.save();
        res.status(201);
      }
      res.send(article);
    }
  } catch (error) {
    console.log(error);
  }
};

router.get('/', getallArticles);
router.post('/', postArticle);
router.put('/:id', validateAuthor, setAuthor);

module.exports = router;
