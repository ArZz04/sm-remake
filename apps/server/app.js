// IMPORTS LIBRARIES
const express = require('express');
const cors = require('cors');

// IMPORTS FOLDERS
const { dbConnection } = require('./config/mongo');
const { PORT, author } = require('./config/constants');

// ROUTES
const productRoutes = require('./routes/productRoute');
const familyRoutes = require('./routes/familyRoute');

// INITIALIZES APPS
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: ["https://web-sm.netlify.app", "http://127.0.0.1:5500", "https://arzz04.github.io", "http://192.168.1.2:5500", "http://192.168.1.3:5500"],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// CONSTANTS DECLARATION

// ENDPOINTS DEFAULTS

app.use('/api/products', productRoutes);
app.use('/api/families', familyRoutes);


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