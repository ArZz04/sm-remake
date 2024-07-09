require('dotenv').config();

// APP OPTIONS
const PORT = process.env.PORT || 3000;

// APP INFO
const APP_NAME = 'sm-api';
const APP_VERSION = '1.0.0';
const author = {
    'username': 'ArZz',
    'name' : 'Juan Arvizu'
};

// MONGODB CREDENTIALS

const dbName = process.env.DBNAME;
const usr = process.env.USR;
const pwd = process.env.PASS;

// MONGODB URL

const MONGO_URI = `mongodb+srv://${usr}:${pwd}@${dbName}.0z7r5tf.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;


module.exports = {
    PORT,
    APP_NAME,
    APP_VERSION,
    author,
    MONGO_URI
};