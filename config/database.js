var mongoose = require('mongoose');
require('dotenv').load();

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, 
        { useNewUrlParser: true })
    .then(() => {
        console.log('connected');
    })
    .catch((error) => {
        console.error(error);
    });