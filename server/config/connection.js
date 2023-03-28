const mongoose = require('mongoose');
require('dotenv').config()

const connectionStringURI = process.env.MONGO_URI;

mongoose.connect(
    connectionStringURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);

module.exports = mongoose.connection;