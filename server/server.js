//here we require express
const express = require('express');
// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express');

// working graphql schema type defs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// grab our mongoose db connection
const db = require('./config/connection');
// set up port with options for hidden port in live app
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
});



// set express() to our app
const app = express();

// urlencoded() is a middleware function used to parse incoming requests with URL-encoded payloads. This middleware funciton is needed when you submit HTML form data in a POST request - it allows you to access the form data in 'req.body' of your route handler
app.use(express.urlencoded({ extended: false}));
// middleware function is used to parse incoming requests with JSON payloads. This middleware function is needed when you submit JSON data in a POST request, it allows you to access the JSON data in req.body of your route handler
// basically, these two things give us access to the data in req.body in the route handlers that we need to set up
app.use(express.json());

const startApolloServer = async (server) => {
    await server.start();
    server.applyMiddleware({ app })
}

startApolloServer(server)

//once this event is open, we want a callback function to fire which will be the console.log to tell us when we are connected to the database
db.once('open', () => {
    console.log('connected to database');
    app.listen(PORT, () => {
        console.log('now listening for requests on port 3001');
    })
})
//this has our app listening and tells us that the server is live
