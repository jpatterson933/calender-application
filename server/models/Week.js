const mongoose = require("mongoose");


const {shiftsSchema} = require('./Shift');

// I can add a hook here to convert start and end time to pacific time
// save the timezone as convertedX with x being the timezone
const weekSchema = new mongoose.Schema({
    dates: {
        type: Array,
        required: true
    },
    savedShifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    }]
},
    {
        toJSON: {
            virtuals: true
        }
    }
);

weekSchema.virtual("shiftsCount").get(function () {
    return this.savedShifts.length;
})
weekSchema.virtual("mondayDate", function(){
    return this.dates[0]; // return the first day of week
})

const Week = mongoose.model("week", weekSchema);

module.exports = Week;