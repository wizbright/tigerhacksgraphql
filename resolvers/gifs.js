var giphy = require('giphy-api')({
    https: true,
    apiKey: process.env.GIPHY_KEY
});

module.exports = {
  gifs(
    {searchString}
  ) {
    return giphy.random({
      tag: searchString,
      rating: 'pg',
      fmt: 'json'
    }).then(function(res) {
      return res.data.image_original_url
    });
  }
}
