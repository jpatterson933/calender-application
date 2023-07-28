const mongoose = require("mongoose");

// I can add a hook here to convert start and end time to pacific time
// save the timezone as convertedX with x being the timezone
const shiftSchema = new mongoose.Schema({
    date: {
        type: Date,
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

},
    {
        toJSON: {
            virtuals: true
        }
    }
);

shiftSchema.pre("save", function (next) {

    const timezoneMap = {
        "pacific": 0,
        "mountain": 1,
        "central": 2,
        "eastern": 3,
        "GMT/BST": 9,
    }

    const convertedTimezone = timezoneMap[this.timezone];

    if (convertedTimezone) {

        const [startHour, startMinute] = this.startTime.split(":");
        const [endHour, endMinute] = this.endTime.split(":");
        const convertedStartTime = Number(startHour) - convertedTimezone;
        const convertedEndTime = Number(endHour) - convertedTimezone;

        this.startTime = `${convertedStartTime}:${startMinute}`;
        this.endTime = `${convertedEndTime}:${endMinute}`;

        this.timezone = `converted|${this.timezone}`;

    }
    next();
})



module.exports = shiftSchema;