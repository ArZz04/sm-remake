const mongoose = require('mongoose');

//id, name, price, family_id, format, dots, last_changed, active
const familySchema = new mongoose.Schema({
    family_id: { type: String, required: true },
    name: { type: String, required: true }
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;