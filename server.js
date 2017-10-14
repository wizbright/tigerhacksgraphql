var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
var cors = require('cors');

var { makeExecuteableSchema } = require('graphql-tools');

// Schema for this thing
var schema = (`
   enum Category {
    Politics
    Sports
    Technology
  }

  type Article {
    category: Category!
    header: String!
    content: String!
    id: String!
  }

  type Query {
    articles(
    id: String
    category: Category
    header: String
    content: String
    ): [Article]!
  }
`);

var resolvers = {
  articles(
    {id, category, header, content},
    {Article}
  ){
    return Article.where(takeDefined({id, category, header, content})).then(articles => articles.toJSON());
  }
};

const executeableSchema = makeExecuteableSchema({
  typeDefs: schema,
  resolvers: resolvers
});

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
const server = app.listen(4000, () => {
  const host = server.address().address;
  const port = server.address().port;
});
console.log("Go to localhost:4000 idiot");
