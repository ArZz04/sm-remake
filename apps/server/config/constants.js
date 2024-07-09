
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

const dbName = process.env.dbname;
const usr = process.env.usr;
const pwd = process.env.pwd;

// MONGODB URL

const MONGO_URI = `mongodb+srv://${usr}:${pwd}@${dbName}.0z7r5tf.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;
const MONGO_URI_LOCAL = `mongodb://localhost:27017/${dbName}`;


module.exports = {
    PORT,
    APP_NAME,
    APP_VERSION,
    author,
    MONGO_URI
};