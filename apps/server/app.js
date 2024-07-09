// IMPORTS LIBRARIES
const express = require('express')

// IMPORTS FOLDERS
const { dbConnection } = require('./config/mongo');
const { PORT, author } = require('./config/constants');

// ROUTES
const productRoutes = require('./routes/productRoute');

// INITIALIZES APPS
const app = express();
// Middleware para analizar JSON
app.use(express.json());
// Middleware para analizar formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// CONSTANTS DECLARATION

// ENDPOINTS DEFAULTS

app.use('/api/product', productRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/info', (req, res) => {
    res.send(author);
});

// Connect to MongoDB
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed', err);
});

module.exports = app;