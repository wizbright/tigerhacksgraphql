const { takeDefined } = require('../helper');

module.exports = {
  articles(
    {id, category, header, content, image},
    {Article}
  ){
    return Article
      .where(takeDefined({id, category, header, content, image}))
      .fetchAll({ })
      .then(articles => articles.toJSON());
  },

  createArticle(
    {category, header, content, image},
    {Article}
  ){
    const article = new Article({
      category: category,
      header: header,
      content: content,
      image: image
    });

    return article
      .save()
      .then(result => result.toJSON());
  }
};
