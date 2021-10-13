const router = require('express').Router();

const {
  models: { Tag, Tagging },
} = require('../db');
module.exports = router;

// GET /api/tags
router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll({ include: Tagging });

    // console.log("ALL TAGS: ", tags);
    res.json(tags);
  } catch (err) {
    console.log('> GET /api/tags ERR: ', err);
    next(err);
  }
});

// POST /api/tags
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newTag = await Tag.create({ name: name });

    // console.log("NEW TAG CREATED: ", newTag);
    res.json(newTag);
  } catch (err) {
    console.log('> POST /api/tags ERR: ', err);
    next(err);
  }
});

// GET /api/tags/:id
router.get('/:id', async (req, res, next) => {
  try {
    //
    const { id } = req.params;
    const singleTag = await Tag.findByPk(id);

    if (!singleTag) {
      res.sendStatus(404);
      return;
    }

    // console.log("SINGLE TAG: ", singleTag);
    res.status(200).send(singleTag);
  } catch (err) {
    console.log('> GET /api/tags/:ID ERR: ', err);
    next(err);
  }
});
