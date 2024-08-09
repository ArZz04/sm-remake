const Schendule = require('../models/Schendule');

const getSchendule = async (req, res) => {
        try {
            const SchenduleResponse = await Schendule.find();
            res.json(SchenduleResponse);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Failed to fetch products', details: error.message });
        }
    };

const setSchendule = async (req, res) => {
    const { textUp, textDown } = req.body;

    // Validación de datos
    if ( !textUp || !textDown ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const schendule = new Schendule({ textUp, textDown });

        await schendule.save();

        res.status(201).json({ message: 'Schendule registered successfully', schendule });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
}

module.exports = { getSchendule, setSchendule };