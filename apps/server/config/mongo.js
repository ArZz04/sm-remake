const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/constants');
const { URI }   = "mongodb+srv://arzz:0LSxlXz8MO48UOoV@sm-db.0z7r5tf.mongodb.net/?retryWrites=true&w=majority&appName=sm-db"

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const dbConnection = async () => {
    try {
        await mongoose.connect( MONGO_URI, clientOptions);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = { dbConnection };