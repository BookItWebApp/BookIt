const router = require("express").Router();
const {
  models: { Tagging, Tag, UserArticle },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const taggings = await Tagging.findAll({
      include: [Tag, UserArticle],
    });
    res.json(taggings);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tagging = await Tagging.findAll({
      where: { id: req.params.id },
      include: [Tag, UserArticle],
    });
    res.json(tagging);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const tagging = await Tagging.create({
      featured: req.body.featured,
      tagId: req.body.tagId,
      userArticlesId: req.body.userArticlesId,
    });
    res.json(tagging);
  } catch (err) {
    next(err);
  }
});
