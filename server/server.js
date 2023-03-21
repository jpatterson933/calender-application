//here we require express
const express = require('express');
// grab our mongoose db connection
const db = require('./config/connection');
// grab our mongoose package
// const mongoose = require('mongoose');
// set express() to our app
const app = express();
// set up port which will later be hidden in .env
const PORT = process.env.PORT || 4000;
//must destructure graphqlhttp due to an update
// const { graphqlHTTP } = require('express-graphql');
//----------------------------- from old file
// const routes = require("./routes");

// // const session = require ('express-session')
// var Store = require('express-session').Store;
// var MongooseStore = require('mongoose-express-session')(Store);


// //middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(require('express-session')({
//     secret: 'keyboard category',
//     resave: false,
//     rolling: false,
//     saveUninitialized: true,
//     store: new MongooseStore({
//         /* configuration */
//         mongoose:mongoose,
//         store:Store,

//     })
// }));
// ------------------------------------
// const schema = require('./schema/schema');
// const connectionStringURI = `mongodb+srv://jpatt93:1J1Rg4drvXETlL8f@cluster0.h7w72et.mongodb.net/test`;

// package that will allow us to allow cross origin requests
// const cors = require('cors');

//here we define our express function as app

//this connects us to the mongoose database

// allow cross-origin request
// app.use(cors());

// connects to the online database - will be commented out and only going to use local db
// mongoose.connect(
//     connectionStringURI,
//     { useNewUrlParser: true, useUnifiedTopology: true },

// );

// mongoose.connect('mongodb://localhost:27017/sub-fsf-edx')

//this is an event listener

// //this is a middleware function - this handles graphql requests
// app.use('/graphql', graphqlHTTP({
//     schema,
//     //this allows us to use graphiql to test out graphql
//     graphiql: true

// }));

//once this event is open, we want a callback function to fire which will be the console.log to tell us when we are connected to the database
db.once('open', () => {
    console.log('connected to database');
    app.listen(PORT, () => {
        console.log('now listening for requests on port 4000');
    })
})
//this has our app listening and tells us that the server is live