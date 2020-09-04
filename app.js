//jshint esversion:8

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Models
const articlesModel = require("./schema/articles");

//Run Server
app.listen(port, function() {
  console.clear();
  console.log(`Server started on port ${port}`);
});
