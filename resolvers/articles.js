const {
  takeDefined,
  generateHeadline,
  generateContent,
  generateImage,
  findNouns
} = require('../helper');

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

  async createArticle(
    {category, header, content, image},
    {Article}
  ){
    if(!header)
      header = await generateHeadline(category);

    var nouns = await findNouns(header);
    console.log(nouns[0]);

    if(!content)
      content = await generateContent(category);
    if(!image)
      image =  await generateImage(nouns[0]);

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
