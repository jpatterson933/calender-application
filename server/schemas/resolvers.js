
const { async } = require('rxjs');
const { Week, Shift } = require('../models');

function getMondayDate(shiftDate) {
    let parsedDate = new Date(`${shiftDate}T00:00:00.000Z`)
    let dayIndexValue = parsedDate.getDay();

    let isMondayBoolean = (dayIndexValue === 0) ? true : false;
    console.log(`Is this a monday: ${isMondayBoolean}`)
    if (isMondayBoolean) {
        return parsedDate;
    } else {

        const monday = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate() - (dayIndexValue - 1))
        return monday;
    }

}

const resolvers = {
    Query: {
        shifts: async () => {
            return await Shift.find({});
        },
        weeks: async () => {
            return await Week.find({}).populate('savedShifts');
        },
    },
    Mutation: {
        addShift: async (parent, { date, timezone, startTime, endTime }) => {
            console.log(date, timezone, startTime, endTime);
            // this does not work correctly with non-pacific timezones
            const existingShift = await Shift.findOne({ date: date, timezone:timezone, startTime: startTime })
            if (existingShift) {
                console.log(existingShift, "this shift already exists")
                throw new Error("A shift with the same date and time already exists buddy!");
            }
            const newShift = await Shift.create({ date, timezone, startTime, endTime });
            const mondayDate = getMondayDate(date);
            // console.log(newShift, existingShift)
            console.log(newShift, "new shift", mondayDate, "monday day")
            let week = await Week.findOne({ "dates.0": mondayDate })
            console.log(week)

            if (week) {
                week.savedShifts.push(newShift);
                await week.save();
            } else {
                const dates = [];

                for (let i = 0; i < 5; i++) {
                    const newDate = new Date(mondayDate);
                    newDate.setDate(newDate.getDate() + i);
                    dates.push(newDate);
                }

                week = await Week.create({ dates, savedShifts: [newShift] });
                console.log(week) // this is sending back a saved shift
            }


            return newShift;
        }
    }
}

module.exports = resolvers;