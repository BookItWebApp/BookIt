const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));

// TAG ROUTES
router.use("/tags", require("./tags"));
router.use("/taggings", require("./taggings"));
router.use('/article', require('./article'))
router.use("/articles", require("./articles"));
router.use('/userArticles', require('./userArticles'));
router.use('/userArticles', require('./userArticles'))
router.use('/sharings', require('./sharings'));


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
