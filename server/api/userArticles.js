//ROUTES FOR A SINGLE USERS ARTICLES
const router = require("express").Router();
const {
    models: { UserArticle, Article, Tagging, Tag }
} = require("../db");

module.exports = router;

//Retrieve all articles from UserArticle Table
router.get("/", async (req, res, next) => {
    try {
        const allArticles = await UserArticle.findAll({
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
        res.json(allArticles);
    } catch (err) {
        next(err);
    }
});

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
            featured: featured
        });
        console.log("CREATED ARTICLE: ", userArticles);

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
        console.log("UPDATE_MARK USER_ARTICLE BODY > ", req.body);
        const updatedUserArticle = await UserArticle.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        });
        const [rowsUpdate, [userArticle]] = updatedUserArticle;
        // console.log("USER ARRTICEL > ", userArticle)

        if (!rowsUpdate) {
            res.sendStatus(404);
        }

        res.status(200).json(userArticle);
    } catch (err) {
        // console.log('> PUT /api/useArticles/ID ERR: ', err);
        next(err);
    }
});
