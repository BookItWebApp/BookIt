const router = require('express').Router();
const {
  models: { Article, UserArticle, Tag, Tagging },
} = require('../db/index');
const sequelize = require('../db/db');

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
  const t = await sequelize.transaction({ autocommit: false });
  // console.log(req.body);
  try {
    //console.log('POST ARTICLE BODY: ', req.body);
    //define in higer scope

    let url = req.body.article.url;
    let articleName = req.body.article.name;
    let articleNote = req.body.article.note;
    let isPrivate = req.body.article.isPrivate;
    let userId = req.body.userId;
    let tagsArr = req.body.article.tags;

    // CREATE ARTICLE
    const article = await Article.create(
      {
        url: url,
      },
      { transaction: t }
    );
    // console.log("ARTICLE IS CREATED: ", article);

    // CREATE USER ARTICLE
    const userArticle = await UserArticle.create(
      {
        name: articleName,
        userId: userId,
        articleId: article.id,
        isPrivate: isPrivate,
        note: articleNote,
      },
      { transaction: t }
    );
    // console.log("=> USER_ARTICLE IS CREATED: ", userArticle);

    // // CREATE TAGS/TAGGING
    await Promise.all(
      tagsArr.map(async (tagName) => {
        let [tag, created] = await Tag.findOrCreate({
          where: { name: tagName },
          transaction: t,
        });
        // console.log('=> TAGS IS CREATED: ', tag);
        return await Tagging.create(
          {
            tagId: tag.id,
            userArticlesId: userArticle.id,
          },
          { transaction: t }
        );
      })
    );

    const createdArticle = await UserArticle.findByPk(
      userArticle.id,
      {
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
      },
      { transaction: t }
    );
    // console.log("ARTICLE TO SEND > ", createdArticle);

    await t.commit();

    res.status(201).send();
  } catch (error) {
    console.log('CREATE ARTICLE ERR: ', error);
    await t.rollback();
    next(error);
  }
};

// const postArticle = async (req, res, next) => {
//   try {
//     const [article, created] = await Article.findOrCreate({
//       where: { url: req.body.url },
//     });
//     if (created) {
//       res.send(article).status(204);
//     } else {
//       res.send(article);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

router.get('/', getallArticles);
router.post('/', postArticle);

module.exports = router;
