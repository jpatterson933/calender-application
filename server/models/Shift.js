const mongoose = require('mongoose');

// I can add a hook here to convert start and end time to pacific time
// save the timezone as convertedX with x being the timezone
const ShiftSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }

});

const Shift = mongoose.model("Shift", ShiftSchema);

module.exports = Shift;