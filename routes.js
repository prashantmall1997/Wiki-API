//jshint esversion:8

//Models
const articlesModel = require("./schema/articles");

//Routes
module.exports = function(app) {

  app.route("/articles")
    .get((req, res) => {
      articlesModel.find({}, (err, foundArticles) => {
        if (!err) {
          res.send(foundArticles);
        } else {
          res.send(err);
        }
      });
    })

    .post((req, res) => {
      const newArticle = new articlesModel({
        title: req.body.title,
        content: req.body.content
      });
      newArticle.save((err) => {
        if (!err) {
          res.send("Successfully added new article.");
        } else {
          res.send(err);
        }
      });
    })

    .delete((req, res) => {
      articlesModel.deleteMany({}, (err) => {
        if (!err) {
          res.send("All articles deleted.");
        } else {
          res.send(err);
        }
      });
    });

  app.route("/articles/:articleTitle")
    .get((req, res) => {
      articlesModel.findOne({
        title: req.params.articleTitle
      }, (err, foundArticle) => {
        if (!err) {
          if (foundArticle) {
            res.send(foundArticle);
          } else {
            res.send(`No article found with title: ${req.params.articleTitle}`);
          }
        } else {
          res.send(err);
        }
      });
    })

    .put((req, res) => {
      articlesModel.replaceOne({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, (err, result) => {
        if (!err) {
          if (result.n === 1) {
            res.send("Successfully updated article.");
          } else {
            res.send(`No article found with title: ${req.params.articleTitle}`);
          }
        } else {
          res.send(err);
        }
      });
    })

    .patch((req, res) => {
      articlesModel.updateOne({
        title: req.params.articleTitle
      }, {
        $set: req.body
      }, (err, result) => {
        if (!err) {
          if (result.n === 1) {
            res.send("Successfully updated article.");
          } else {
            res.send(`No article found with title: ${req.params.articleTitle}`);
          }
        } else {
          res.send(err);
        }
      });
    })

    .delete((req, res) => {
      articlesModel.deleteOne({
        title: req.params.articleTitle
      }, (err) => {
        if (!err) {
          res.send("Article deleted.");
        } else {
          res.send(err);
        }
      });
    });

};
