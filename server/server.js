const express = require('express');
const path = require('path');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// define our startServer() function
const startServer = async () => {
  // create a new Apollo server an pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to tes our GQL API
  console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// get all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
