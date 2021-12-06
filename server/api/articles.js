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
        // console.log("=> FOUND USER_ARTICLE NAMES > ", foundUserArticles);

        // SEARCH AND COMPARE EXISTING ARTICLES_NAMES WITH REQUESTED ONE.
        let duplicateUserArticleName = foundUserArticles.some(
            (userArticle) => articleName === userArticle.name
        );
        // console.log(
        //     "=> ANY DUPICATE ARTICLE NAME > ",
        //     duplicateUserArticleName
        // );
        // IF ARTICLE EXISTS THEN RETURN MSG
        if (duplicateUserArticleName) {
            const error = Error("Bookmark name exists! Create a new name!");
            error.status = 400;
            console.log("DUPLICATED BOOKMARK NAME ERR > ", error);
            throw error;
        }

        // SEARCH AND COMPARE EXISTING ARTICLES_URL WITH REQUESTED ONE.
        let duplicateUserArticleUrl = foundUserArticles.some((userArticle) => {
            // console.log("userArticle.article_URL> ", userArticle.article.url);
            return url === userArticle.article.url;
        });
        // console.log("FOUND DUPLICATE ARTILCES URL > ", duplicateUserArticleUrl);

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
        const article = await Article.create({
            url: url
        });
        // console.log("=> NEW ARTICLE IS CREATED > ", article);

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
        // console.log("=> USER_ARTICLE IS CREATED > ", userArticle);

        // // CREATE TAGS/TAGGING
        await Promise.all(
            tagsArr.map(async (tagName) => {
                let [tag, created] = await Tag.findOrCreate({
                    where: { name: tagName },
                    transaction: t
                });
                // console.log("=> TAGS ARE CREATED > ", tag);
                return await Tagging.create(
                    {
                        tagId: tag.id,
                        userArticlesId: userArticle.id
                    },
                    { transaction: t }
                );
            })
        );
        await t.commit();

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
        // console.log("=> ARTICLE TO SEND > ", createdArticle);

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
