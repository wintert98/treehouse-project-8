const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      res.status(500).send(error);
    }
  }
}

/* GET books listing. */ /*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

/* GET articles listing. */
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll();
  res.render("articles/index", { articles: {}, title: "Sequelize-It!" });
}));

/* Create a new article form. */
router.get('/new', (req, res) => {
  res.render("articles/new", { article: {}, title: "New Article" });
});

/* POST create article. */
router.post('/', asyncHandler(async (req, res) => {
  const article = await Article.create(req.body);
  res.redirect("/articles/" + article.id);
}));

/* Edit article form. */
router.get("/:id/edit", asyncHandler(async(req, res) => {
  res.render("articles/edit", { article: {}, title: "Edit Article" });
}));

/* GET individual article. */
router.get("/:id", asyncHandler(async (req, res) => {
  const article = await Article.findByPK(req.params.id);
  console.log(article);
  res.render("articles/show", { article, title: article.title }); 
}));

/* Update a book. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  res.redirect("/articles/");
}));

/* Delete article form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  res.render("articles/delete", { article: {}, title: "Delete Article" });
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  res.redirect("/articles");
}));

module.exports = router;
