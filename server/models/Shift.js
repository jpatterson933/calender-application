const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    // startTime: {
    //     type: String,
    //     required: true
    // },
    // endTime: {
    //     type: String,
    //     required: true
    // },
    // timezone: {
    //     type: String,
    //     required: true
    // }

});

const Shift = mongoose.model("Shift", ShiftSchema);

module.exports = Shift;