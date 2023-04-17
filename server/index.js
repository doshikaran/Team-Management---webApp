const express = require("express");
const cors = require("cors")
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/database");
const port = process.env.PORT || 8000;

const app = express();

// connect to our database
connectDB();
// cors
app.use(cors())

// using local host i will open graphiql which helps me run my query
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV,
  })
);
app.listen(port, console.log(`server is runnin on port ${port}`));
