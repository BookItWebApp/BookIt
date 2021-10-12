//ROUTES FOR A SINGLE ARTICLE
const router = require("express").Router();
const {
  models: { Article },
} = require("../db");

module.exports = router;

//Retrieve article open graph data
router.get("/preview", async (req, res, next) => {
  try {
    const url = req.query.url;
    const metaData = await Article.metaData(url);
    console.log("MetaData", metaData);
    res.json(metaData);
  } catch (err) {
    next(err);
  }
});
