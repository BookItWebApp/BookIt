const router = require('express').Router();
const sequelize = require('../db/db');

const {
  models: { Sharing, SharingDetail, UserArticle, User, Article },
} = require('../db');
module.exports = router;

// GET all articles shared within specific sharing
router.get('/:sharingId', async (req, res, next) => {
  try {
    const sharing = await Sharing.findByPk(req.params.sharingId, {
      include: {
        model: SharingDetail,
        include: { model: UserArticle, include: { model: Article } },
      },
    });
    res.json(sharing);
  } catch (err) {
    next(err);
  }
});

// send from frontend: userId, [userArticlesId], userMessage. return to the frontend: generated url
router.post('/:userId', async (req, res, next) => {
  const t = await sequelize.transaction({ autocommit: false });
  try {
    const sharing = await Sharing.create(
      {
        userId: req.params.userId,
        userMessage: req.body.userMessage,
      },
      { transaction: t }
    );

    const sharingId = sharing.id;
    const articles = req.body.articles;

    await Promise.all(
      articles.map((article) => {
        return SharingDetail.create(
          {
            sharingId: sharingId,
            userArticlesId: article.id,
          },
          { transaction: t }
        );
      })
    );

    await t.commit();

    res.json(sharing);
  } catch (err) {
    await t.rollback();
    next(err);
  }
});
