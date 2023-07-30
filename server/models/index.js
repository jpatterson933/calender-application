const mongoose = require("mongoose");
const { shiftSchema } = require("./Shift");
const Shift = mongoose.model("Shift", shiftSchema);
module.exports = {
    Shift,
    Week: require('./Week')
}