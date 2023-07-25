const mongoose = require('mongoose');
require('dotenv').config()

const connectionStringURI = process.env.MONGO_URI;

mongoose.connect(
    connectionStringURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successful connect! from connection.js");
    })
    .catch(err => {
        console.error(err);
    })

module.exports = mongoose.connection;