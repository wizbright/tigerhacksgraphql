const { bookshelf } = require('../database');

const Article = bookshelf.Model.extend({
  tableName: "articles"
});

bookshelf.model("Article", Article);
module.exports = Article;
