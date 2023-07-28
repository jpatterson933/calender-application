const { previousMonday, isMonday, addDays } = require("date-fns");

const db = require('../config/connection');
const shiftData = require('./shiftData.json');
const { Week, Shift } = require('../models');


function getMondayDate(shiftDate) {
    let isMondayBoolean = isMonday(shiftDate);

    if (isMondayBoolean) {
        return shiftDate;
    } else {
        return previousMonday(shiftDate);
    }

}

// seed shift data iwth current shifts
db.once('open', async () => {

    try {
        await Shift.deleteMany({}); // empty collection
        await Week.deleteMany({});


        const shifts = await Shift.create(shiftData)

        for (const shift of shifts) {

            let mondayDate = getMondayDate(shift.date);

            let week = await Week.findOne({ "dates.0": mondayDate })

            if (week) {
                week.savedShifts.push(shift)
            } else {

                const dates = [];
                for (let i = 0; i < 5; i++) {
                    const newDate = new Date(mondayDate);
                    newDate.setDate(newDate.getDate() + i);
                    dates.push(newDate);
                }

                const savedShifts = shifts.filter(shift => getMondayDate(shift.date).getTime() === mondayDate.getTime());
                await Week.create({ dates, savedShifts })
            }
        }





        console.log('all done!');
        process.exit(0);
        // added error handling
    } catch (err) {
        throw err;
    }

})
