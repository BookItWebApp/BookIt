//ROUTES FOR A SINGLE USERS ARTICLES
const router = require('express').Router();
const {
  models: { UserArticle, Article, Tagging, Tag },
} = require('../db');

const { isValidUser } = require("../middleware/middleware");

module.exports = router;

//Retrieve all articles from UserArticle Table
router.get('/', async (req, res, next) => {
  try {
    const allArticles = await UserArticle.findAll({
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
    res.json(allArticles);
  } catch (err) {
    next(err);
  }
});

//Retrieve all of a single user's articles
router.get('/:id', async (req, res, next) => {
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
            featured: featured
        });

        res.json(userArticles);
    } catch (err) {
        console.log("CREATE ARTICLE ERR: ", err);
        next(err);
    }
});

// PUT /api/useArticles/:id
router.put("/:id", async (req, res, next) => {
    try {
        //
        const id = req.body.article.id;

        const updateArticle = await UserArticle.update(
            { ...req.body.article },
            {
                where: { id: id }
            }
        );

        const updatedUserArticle = await UserArticle.findByPk(id, {
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

    res.status(200).json(updatedUserArticle);
  } catch (err) {
    console.log('> PUT /api/useArticles/ID ERR: ', err);
    next(err);
  }
});

// DELETE /api/useArticles/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const userArticle = await UserArticle.findByPk(id, {
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

        await userArticle.destroy();
        res.send(userArticle);
    } catch (err) {
        console.log("ERROR FROM DELETE /USEARTICLES/:ID", err);
        next(err);
    }
});
