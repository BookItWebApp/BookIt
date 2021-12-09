const router = require("express").Router();
const {
    models: { Article, UserArticle, Tag, Tagging }
} = require("../db/index");
const sequelize = require("../db/db");

const { validUserOrEmail, isValidUser } = require("../middleware/middleware");

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

        // FIND ALL USER_ARTICLES THAT BELONG TO SPECIFIC USER
        const foundUserArticles = await UserArticle.findAllByUser(userId);

        // SEARCH AND COMPARE EXISTING ARTICLES_URL WITH REQUESTED ONE.
        let duplicateUserArticleUrl = foundUserArticles.some((userArticle) => {
            return url === userArticle.article.url;
        });

        // IF ARTICLE_URL EXISTS THEN RETURN MSG
        if (duplicateUserArticleUrl) {
            const error = Error(
                `Bookmark url: ${url} exists! Please try another url!`
            );
            error.status = 400;
            console.log("DUPLICATED URL ERR > ", error);
            throw error;
        }

        // CREATE ARTICLE IF NO ERRORS
        const article = await Article.create(
            {
                url: url
            },
            { transaction: t }
        );

        // CREATE USER ARTICLE
        const userArticle = await UserArticle.create(
            {
                name: articleName,
                userId: userId,
                articleId: article.id,
                isPrivate: isPrivate,
                note: articleNote
            },
            { transaction: t }
        );

        // // CREATE TAGS/TAGGING
        await Promise.all(
            tagsArr.map(async (tagName) => {
                let [tag, created] = await Tag.findOrCreate({
                    where: { name: tagName },
                    transaction: t
                });
                return await Tagging.create(
                    {
                        tagId: tag.id,
                        userArticlesId: userArticle.id
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
                        attributes: ["id", "url"]
                    },
                    {
                        model: Tagging,
                        include: {
                            model: Tag
                        }
                    }
                ]
            },
            { transaction: t }
        );
        await t.commit();

        await res.status(201).send(createdArticle);
    } catch (error) {
        console.log("CREATE ARTICLE ERR: ", error);
        next(error);
        await t.rollback();
    }
};

router.get("/", getallArticles);
router.post("/", isValidUser, postArticle);

module.exports = router;
