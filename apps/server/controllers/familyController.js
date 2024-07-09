const Family = require('../models/Family');

const createFamily = async (req, res) => {
    const { name, family_id } = req.body;

    // Validación de datos
    if ( !family_id || !name ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingFamily = await Family.findOne({ family_id });
        if (existingFamily) {
            return res.status(400).json({ error: 'A family with this family_id already exists' });
        }

        const family = new Family({ family_id, name });

        await family.save();

        res.status(201).json({ message: 'Family registered successfully', family });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
};

const allFamilies = async (req, res) => {
    try {
        const families = await Family.find();
        res.json(families);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

module.exports = { allFamilies, createFamily };