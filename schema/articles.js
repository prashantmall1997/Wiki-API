//jshint esversion:8

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const articlesSchema = new Schema({
  title: {
    required: true,
    type: String,
    unique: true
  },
  content: {
    required: true,
    type: String
  }
});

const articlesModel = mongoose.model('article', articlesSchema);
module.exports = articlesModel;
