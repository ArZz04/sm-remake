const mongoose = require('mongoose');

//id, name, price, family_id, format, dots, last_changed, active
const SchenduleSchema = new mongoose.Schema({
    textUp: { type: String, required: true },
    textDown: { type: String, required: true }
});

const Schendule = mongoose.model('Schendule', SchenduleSchema);

module.exports = Schendule;