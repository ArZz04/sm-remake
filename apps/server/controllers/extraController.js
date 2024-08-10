const Schedule = require('../models/Schedule');

const getSchedule = async (req, res) => {
    try {
        const SchenduleResponse = await Schedule.find();
        res.json(SchenduleResponse);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

const setSchedule = async (req, res) => {
    const { textUp, textDown } = req.body;

    // Validación de datos
    if (!textUp || !textDown) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Elimina cualquier horario existente
        await Schendule.deleteMany({});

        // Crea y guarda el nuevo horario
        const schedule = new Schedule({ textUp, textDown });
        await schedule.save();

        res.status(201).json({ message: 'Schedule registered successfully', schedule });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
};
module.exports = { getSchedule, setSchedule };