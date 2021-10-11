const router = require("express").Router();
const {
  models: { UserArticle },
} = require("../db");
module.exports = router;

//Retrieve all of a user's articles
router.get("/", async (req, res, next) => {
  try {
    const {userId} = req.body.id;
    const articles = await UserArticle.findAllByUser(userId);
    res.json(articles);
  } catch (err) {
    next(err);
  }
});
