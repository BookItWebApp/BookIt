//ROUTES FOR A SINGLE ARTICLE
const router = require('express').Router();
const {
  models: { Article },
} = require('../db');

module.exports = router;

const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
]);
const got = require('got');

//Retrieve article open graph data
router.get('/preview', async (req, res, next) => {
  try {
    const targeturl = req.query.url;
    console.log(targeturl)
    const { body: html, url } = await got(targeturl);
    const metadata = await metascraper({ html, url });
    console.log('MetaData', metadata);
    res.json(metadata);
  } catch (err) {
    next(err);
  }
});


