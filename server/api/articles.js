const router = require("express").Router();
const {
  models: { Article, UserArticle, Tag, Tagging },
} = require('../db/index');
const sequelize = require('../db/db');
const { date } = require("faker");

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

// PUT /api/articles
const changeArticle = async (req, res, next) => {
  // const t = await sequelize.transaction({ autocommit: false });
  try {
    let bookmarkId = req.body.id
    let bookmarkName = req.body.name;
    let bookmarkNote = req.body.note;
    let read = req.body.read
    let tagsArr = req.body.tags;

     const userArticle = await UserArticle.findByPk(
      id
      // { transaction: t }
    );

    let newRead=null;

    if (userArticle.readAt && read){
      newRead=userArticle.readAt
    } else if (!userArticle.readAt && read) {
      newRead = date
    }

    // UPDATE USER ARTICLE

    let updatedUserArticle = await UserArticle.update({
      name: bookmarkName,
      note: bookmarkNote,
      readAt: newRead
    }, {
      where: { id: bookmarkId }
    });



    // create(
    //   {
    //     name: articleName,
    //     userId: userId,
    //     articleId: article.id,
    //     isPrivate: isPrivate,
    //     note: articleNote,
    //   },
    //   { transaction: t }
    // );

    // UPDATE TAGS/TAGGING
    // await Promise.all(
    //   tagsArr.map(async (tagName) => {
    //     let [tag, created] = await Tag.findOrCreate({
    //       where: { name: tagName },
    //       transaction: t,
    //     });

    //     return await Tagging.create(
    //       {
    //         tagId: tag.id,
    //         userArticlesId: userArticle.id,
    //       },
    //       { transaction: t }
    //     );
    //   })
    // );

    // const createdArticle = await UserArticle.findByPk(
    //   userArticle.id,
    //   {
    //     include: [
    //       {
    //         model: Article,
    //         attributes: ['id', 'url'],
    //       },
    //       {
    //         model: Tagging,
    //         include: {
    //           model: Tag,
    //         },
    //       },
    //     ],
    //   },
    //   { transaction: t }
    // );

    // await t.commit();

    res.status(201).send(updatedUserArticle);
  } catch (error) {
    // await t.rollback();
    next(error);
  }
};



router.get("/", getallArticles);
router.post("/", postArticle);
router.put("/", changeArticle);

module.exports = router;
