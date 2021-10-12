const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use('/userArticles', require('./userArticles'))
router.use('/article', require('./article'))


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
