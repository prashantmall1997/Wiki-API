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
};
