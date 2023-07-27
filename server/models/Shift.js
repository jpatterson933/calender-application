const mongoose = require("mongoose");

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

ShiftSchema.pre("save", function (next) {
    const timeZoneAdjustments = {
        mountain: 1,
    }

    if (this.timezone === "mountain") {
        let startHour = this.startTime.split(":")[0];
        let startMinute = this.startTime.split(":")[1]
        let endHour = this.endTime.split(":")[0];
        let endMinute = this.endTime.split(":")[1]

        const convertedStartTime = startHour - timeZoneAdjustments.mountain;
        const convertedEndTime = endHour - timeZoneAdjustments.mountain

        this.startTime = `${convertedStartTime}:${startMinute}`;
        this.endTime = `${convertedEndTime}:${endMinute}`;

        this.timezone = "convertedMountain";

    }
    next();
})

const Shift = mongoose.model("Shift", ShiftSchema);

module.exports = Shift;