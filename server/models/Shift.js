const mongoose = require("mongoose");

// I can add a hook here to convert start and end time to pacific time
// save the timezone as convertedX with x being the timezone
const shiftSchema = new mongoose.Schema({
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

},
    {
        toJSON: {
            virtuals: true
        }
    }
);

shiftSchema.pre("save", function (next) {

    function convertTime(time, offset) {
        const [hour, minute] = time.split(":");
        const convertedHour = Number(hour) - offset;
        return `${convertedHour}:${minute}`;
    }
    
    switch (this.timezone) {
        case "mountain":
            this.startTime = convertTime(this.startTime, 1);
            this.endTime = convertTime(this.endTime, 1);
            this.timezone = `converted|${this.timezone}`;
            break;
        case "central":
            this.startTime = convertTime(this.startTime, 2);
            this.endTime = convertTime(this.endTime, 2);
            this.timezone = `converted|${this.timezone}`;
            break;
        case "eastern":
            this.startTime = convertTime(this.startTime, 3);
            this.endTime = convertTime(this.endTime, 3);
            this.timezone = `converted|${this.timezone}`;
            break;
        case "GMT/BST":
            this.startTime = convertTime(this.startTime, 9);
            this.endTime = convertTime(this.endTime, 9);
            this.timezone = `converted|${this.timezone}`;
            break;
        default:
            // No conversion necessary for "pacific" or any other cases
            break;
    }
    
    next();
})



module.exports = shiftSchema;