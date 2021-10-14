const router = require('express').Router();

const {
  models: { Author, Article, UserArticle, Tagging, Tag },
} = require('../db');

// Middleware
const validate = async (req, res, next) => {
  try {
    if (req.headers.authorization !== process.env.SECRET) {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

// GET
const getSingle = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: {
        model: Article,
        include: {
          model: UserArticle,
          include: { model: Tagging, include: Tag },
        },
      },
    });
    if (author) {
      res.send(author);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const authors = await Author.findAll({
      include: {
        model: Article,
        include: {
          model: UserArticle,
          include: { model: Tagging, include: Tag },
        },
      },
    });
    res.send(authors);
  } catch (error) {
    next(error);
  }
};
// POST
const postAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.send(author).status(201);
  } catch (error) {
    next(error);
  }
};

// PUT
const putAuthor = async (req, res, next) => {
  try {
    await Author.update(req.body, {
      where: { id: req.params.id },
    });

    const author = await Author.findByPk(req.params.id, {
      include: {
        model: Article,
        include: {
          model: UserArticle,
          include: { model: Tagging, include: Tag },
        },
      },
    });

    res.send(author).status(201);
  } catch (error) {
    next(error);
  }
};
// DELETE
const deleteAuthor = async (req, res, next) => {
  try {
    await Author.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
// ROUTES
router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', validate, postAuthor);
router.put('/:id', validate, putAuthor);
router.delete('/:id', validate, deleteAuthor);

module.exports = router;
