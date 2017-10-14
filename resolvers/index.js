const articles = require('./articles');
const gifs = require('./gifs');

module.exports = app => Object.assign(
  {}, articles, gifs
);
