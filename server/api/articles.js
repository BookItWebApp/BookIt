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
        console.log("=> POST ARTICLE BODY : ", req.body);

        let url = req.body.article.bookmarkUrl;
        let articleName = req.body.article.bookmarkName;
        let articleNote = req.body.article.note;
        let isPrivate = req.body.article.isPrivate;
        let userId = req.body.userId;
        let tagsArr = req.body.article.tags;

        const foundUserArticles = await UserArticle.findAllByUser(userId);
        console.log("=> FOUND USER_ARTICLE NAMES > ", foundUserArticles);
        let duplicateUserArticleName = foundUserArticles.some(
            (userArticle) => articleName === userArticle.name
        );
        console.log(
            "=> ANY DUPICATE ARTICLE NAME > ",
            duplicateUserArticleName
        );
        if (duplicateUserArticleName) {
            const error = Error("Bookmark name exists! Create a new name!");
            error.status = 400;
            console.log("DUPLICATED BOOKMARK NAME ERR > ", error);
            throw error;
        }
        let duplicateUserArticleUrl = foundUserArticles.some((article) => {
            console.log("article");
            return articleName === article.name;
        });
        console.log(
            "WHAT WE FOUND DUPLICATE ARTILCES URL > ",
            duplicateUserArticleUrl
        );
        // FIND OR CREATE ARTICLE
        const [article, isCreated] = await Article.findOrCreate({
            where: { url: url },
            transaction: t
        });
        console.log("NEW ARTICLE: ", article);
        console.log("ARTICLE IS CREATED: ", isCreated);

        // CHECK IF ARTICLE IS CREATED, IF NOT IT EXISTS
        if (!isCreated) {
            const error = Error(
                `Bookmark url:${url} exists! Please try another url!`
            );
            error.status = 400;
            console.log("DUPLICATED URL ERR > ", error);
            throw error;
        }

        // // FIND DUPLICATED USER BOOKMARKS
        // const userBookmarks = await UserArticle.findOne({
        //     where: {
        //         name: articleName
        //     }
        // });

        // // TODO: CREATE VALID BOOKMARK MIDDLEWARE
        // console.log("FOUND DUPLICATED BOOKMARK > ", userBookmarks);
        // if (userBookmarks) {
        //     const error = Error("Bookmark name exists! Create a new name!");
        //     error.status = 400;
        //     console.log("DUPLICATED BOOKMARK NAME ERR > ", error);
        //     throw error;
        // }

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
        console.log("=> USER_ARTICLE IS CREATED: ", userArticle);

        // // CREATE TAGS/TAGGING
        await Promise.all(
            tagsArr.map(async (tagName) => {
                let [tag, created] = await Tag.findOrCreate({
                    where: { name: tagName },
                    transaction: t
                });
                console.log("=> TAGS ARE CREATED: ", tag);
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
        // console.log('id ', userArticle.id)
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
            }
            // { transaction: t }
        );
        console.log("=> ARTICLE TO SEND > ", createdArticle);

        await res.status(201).send(createdArticle);
    } catch (error) {
        console.log("CREATE ARTICLE ERR: ", error);
        next(error);
        // await t.rollback();
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

router.get("/", getallArticles);
router.post("/", postArticle);

module.exports = router;
