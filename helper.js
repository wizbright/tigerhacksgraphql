var changeCaseObject = require('change-case-object');
var fs = require('fs');
var markov = require('markov');
var path = require('path');
var giphy = require('giphy-api')({
    https: true,
    apiKey: process.env.GIPHY_KEY
});
const WordPOS = require('wordpos');

module.exports = {
  takeDefined(parameters) {
    Object.keys(parameters)
      .filter(key => parameters[key] === undefined)
      .forEach(key => delete parameters[key]);

    return changeCaseObject.snakeCase(parameters);
  },

  generateHeadline(category) {
    var stream = fs.createReadStream(path.join(__dirname, 'src', category, 'headlines.txt'));
    var m = markov(2);

    return new Promise(function(resolve, _) {
      m.seed(stream, _ => {
        resolve(m.fill(m.pick(), 2).join(' '));
      });
    })
  },

  generateContent(category) {
    var stream = fs.createReadStream(path.join(__dirname, 'src', category, 'content.txt'));
    var m = markov(5);

    return new Promise(function(resolve, _) {
      m.seed(stream, _ => {
        resolve(m.fill(m.pick(), 40).join(' '));
      });
    })
  },

  generateImage(searchString) {
    return giphy.random({
      tag: searchString,
      rating: 'pg',
      fmt: 'json'
    }).then(function(res) {
      return res.data.image_original_url
    });
  },

  findNouns(searchString) {
    var nouns;
    var wordpos = new WordPOS();
    return new Promise(function(resolve, _) {
      wordpos.getNouns(searchString, nouns => {
        resolve(nouns);
      });
    });
  }

};
