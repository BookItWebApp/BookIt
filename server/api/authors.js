const router = require('express').Router();
const { Op } = require('sequelize');

const {
  models: { Author, Article, UserArticle, Tagging, Tag },
} = require('../db');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

// Middleware
/**
 * Checks if the adminAuth header is set the the secret found in the
 * environment variables.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validate = async (req, res, next) => {
  try {
    if (req.headers.adminAuth !== process.env.SECRET) {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

// GET
/**
 * Gets a single author by id, includes articles (which itself includes all user
 * articles, taggings, tags, and co-authors associated)
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getSingle = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: {
        model: Article,
        include: [
          {
            model: UserArticle,
            include: { model: Tagging, include: Tag },
          },
          {
            model: Author,
            where: {
              id: {
                [Op.not]: req.params.id,
              },
            },
          },
        ],
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

/**
 * returns a list of all authors
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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
/**
 * Creates a new author `req.body` should contain:
 * - `name: string`
 * - `bio: text?`
 * - `photoUrl: string?`
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const postAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.send(author).status(201);
  } catch (error) {
    next(error);
  }
};

// PUT
/**
 * Sends an author with changed attributes according to the paramters given to
 * `req.body` Accepts:
 * - `name: string`
 * - `bio: text?`
 * - `photoUrl: string?`
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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

/**
 * Deletes the author requested and sends back http code 204 if successful
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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
