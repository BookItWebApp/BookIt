const router = require('express').Router();
const {
  models: { Article, UserArticle, Tag, Tagging },
} = require('../db/index');
const sequelize = require('../db/db');
const { date } = require('faker');

const getallArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (error) {
    next(error);
  }
};

// POST /api/articles - CREATES USER ARTICLE WITH ALL ATTRIBUTES (BOTH FROM WEB AND EXTENSION)
const postArticle = async (req, res, next) => {
  const t = await sequelize.transaction({ autocommit: false });
  try {
    let url = req.body.article.url;
    let articleName = req.body.article.name;
    let articleNote = req.body.article.note;
    let isPrivate = req.body.article.isPrivate;
    let userId = req.body.userId;
    let tagsArr = req.body.article.tags;

    // CREATE ARTICLE
    const [article, ifCreated] = await Article.findOrCreate({
      where: { url: url },
      transaction: t,
    });

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

    // CREATE TAGS/TAGGING
    await Promise.all(
      tagsArr.map(async (tagName) => {
        let [tag, created] = await Tag.findOrCreate({
          where: { name: tagName },
          transaction: t,
        });

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

    await t.commit();

    res.status(201).send();
  } catch (error) {
    console.log('CREATE ARTICLE ERR: ', error);
    await t.rollback();
    next(error);
  }
};

// PUT /api/articles - UPDATES USER ARTICLE (ALL ATTRIBUTES, FROM EDIT BOOKMARK COMPONENT)
const changeArticle = async (req, res, next) => {
  // const t = await sequelize.transaction({ autocommit: false });
  try {
    const id = req.body.article.id;

    const updateArticle = await UserArticle.update(
      {
        name: req.body.article.name,
        note: req.body.article.note,
        readAt: req.body.article.readAt,
      },
      {
        where: { id: id },
      }
    );

    const updatedUserArticle = await UserArticle.findByPk(id, {
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

    // await t.commit();

    res.status(201).send(updatedUserArticle);
  } catch (error) {
    // await t.rollback();
    next(error);
  }
};

router.get('/', getallArticles);
router.post('/', postArticle);
router.put('/', changeArticle);

module.exports = router;
