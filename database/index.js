const options = {
  client: "pg",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.NAME,
    user: process.env.USER,
    password: process.env.PASS
  },
  searchPath: "knex,public"
};

const knex = require("knex")(options);
const bookshelf = require("bookshelf")(knex);

bookshelf.plugin("registry");
bookshelf.plugin("bookshelf-camelcase");
bookshelf.plugin("bookshelf-returning");

module.exports = { knex, bookshelf };
