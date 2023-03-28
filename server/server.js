//here we require express
const express = require('express');
// grab our mongoose db connection
const db = require('./config/connection');
// set express() to our app
const app = express();
// set up port with options for hidden port in live app
const PORT = process.env.PORT || 4000;


//once this event is open, we want a callback function to fire which will be the console.log to tell us when we are connected to the database
db.once('open', () => {
    console.log('connected to database');
    app.listen(PORT, () => {
        console.log('now listening for requests on port 4000');
    })
})
//this has our app listening and tells us that the server is live