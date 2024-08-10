const mongoose = require('mongoose');

//id, name, price, family_id, format, dots, last_changed, active
const ScheduleSchema = new mongoose.Schema({
    textUp: { type: String, required: true },
    textDown: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;