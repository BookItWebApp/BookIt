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
    //console.log('POST ARTICLE BODY: ', req.body);
    //define in higer scope
    let url;
    let articleName;
    let isPrivate;
    let userId;
    let tagsArr;
    if (req.body.article) {
      //if using body.article param
      url = req.body.article.url;
      articleName = req.body.article.name;
      isPrivate = req.body.article.isPrivate;
      userId = req.body.userId;
      tagsArr = req.body.article.tags;
    } else {
      //if using direct body param (extension)
      url = req.body.url;
      articleName = req.body.name;
      isPrivate = req.body.isPrivate;
      userId = req.body.userId;
      tagsArr = req.body.tags.split(',');
    }

      // CREATE ARTICLE
      const article = await Article.create({
        url: url
    });
    // console.log("ARTICLE IS CREATED: ", article);

        // CREATE USER ARTICLE
        const userArticle = await UserArticle.create({
          name: articleName,
          userId: userId,
          articleId: article.id,
          isPrivate: isPrivate
      });
      // console.log("=> USER_ARTICLE IS CREATED: ", userArticle);

        // // CREATE TAGS/TAGGING
        await Promise.all(
          tagsArr.map(async (tagName) => {
              let tag = await Tag.create({
                  name: tagName
              });
              // console.log("=> TAGS IS CREATED: ", tag);
              return await Tagging.create({
                  tagId: tag.id,
                  userArticlesId: userArticle.id
              });
          })
      );

      const createdArticle = await UserArticle.findByPk(userArticle.id, {
        include: [
            {
                model: Article,
                attributes: ["id", "url"]
            },
            {
                model: Tagging,
                include: {
                    model: Tag
                }
            }
        ]
    });
    // console.log("ARTICLE TO SEND > ", createdArticle);

    res.json(createdArticle);
  } catch (error) {
      console.log("CREATE ARTICLE ERR: ", error);
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
