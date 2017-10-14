require("dotenv").config();

var fs = require('fs');
var express = require('express');
var graphql = require('express-graphql');
var bodyParser = require('body-parser');
var cors = require('cors');
var { takeDefined } = require('./helper');
var { knex, bookshelf } = require('./database');
var models = require('./models');

var { buildSchema } = require('graphql');
var resolvers = require('./resolvers');

var schema = buildSchema(fs.readFileSync('./schema.graphql').toString());

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', graphql(_ => ({
  schema: schema,
  rootValue: resolvers(app),
  graphiql: true,
  context: Object.assign({}, models, { knex, bookshelf })
})));

const server = app.listen(4000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Go to localhost:4000 idiot");
});
