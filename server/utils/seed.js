const { previousMonday, isMonday, parseISO } = require("date-fns");

const db = require('../config/connection');
const shiftData = require('./shiftData.json');
const { Week, Shift } = require('../models');

async function emptyDatabases(){
    await Shift.deleteMany({}); // empty collection
    await Week.deleteMany({});
};

function getMondayDate(shiftDate) {
    let parsedDate = new Date(shiftDate);
    let isMondayBoolean = isMonday(parsedDate);
    if (isMondayBoolean) {
        return parsedDate;
    } else {
        return previousMonday(parsedDate);
    };
};

function convertDateToIsoFormat(shift){
    const dateObj = new Date(shift.date);
    const mondayDate = getMondayDate(dateObj);
    return mondayDate;
};

function createWeekDatesForWeek(mondayDate){
    const dates = [];
    for (let i = 0; i < 5; i++) {
        const newDate = new Date(mondayDate);
        newDate.setDate(newDate.getDate() + i);
        dates.push(newDate);
    };
    return dates;
};

function findShiftsForWeekOfMondayDate(shifts, mondayDate){
    const savedShifts = shifts.filter(shift => getMondayDate(shift.date).getTime() === mondayDate.getTime());
    return savedShifts;
};

async function seedDataWithShiftDateJson() {
    try {
        await emptyDatabases();
        const shifts = await Shift.create(shiftData);
        for (const shift of shifts) {
            let mondayDate = convertDateToIsoFormat(shift);
            
            let week = await Week.findOne({ "dates.0": mondayDate })
            if (week) {
                week.savedShifts.push(shift);
            } else {
                let dates = createWeekDatesForWeek(mondayDate)
                const savedShifts = findShiftsForWeekOfMondayDate(shifts, mondayDate);
                await Week.create({ dates, savedShifts })
            };
        };
        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    };
};

// seed shift data iwth current shifts
db.once('open', async () => {
    seedDataWithShiftDateJson();
});