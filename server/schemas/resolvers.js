
const { async } = require('rxjs');
const { Week, Shift } = require('../models');
const { previousMonday, isMonday, parseISO } = require("date-fns");

function getMondayDate(shiftDate){
    let date = parseISO(shiftDate)

    let isMondayBoolean = isMonday(date);

    if(isMondayBoolean){
        return date;
    } else {
        return previousMonday(date);
    }

}

const resolvers = {
    Query: {
        shifts: async () => {
            return await Shift.find({});
        },
        weeks: async() => {
            return await Week.find({});
        }
    },
    Mutation: {
        addShift: async (parent, {date, timezone, startTime, endTime}) => {
            const existingShift = await Shift.findOne({date: date, startTime: startTime})
            if(existingShift){
                throw new Error("A shift with the same date and time already exists buddy!");
            }
            const newShift = await Shift.create({date, timezone, startTime, endTime});
            // console.log(date, )
            const mondayDate = getMondayDate(date);
            console.log(mondayDate)
            console.log(newShift, existingShift)

            let week = await Week.findOne({"dates.0": mondayDate})

            if(week){
                week.savedShifts.push(newShift);
                await week.save();
            } else {
                const dates = [];

                for(let i = 0; i < 5; i++){
                    const newDate = new Date(mondayDate);
                    newDate.setDate(newDate.getDate() + i);
                    dates.push(newDate);
                }

                week = await Week.create({ dates, savedShifts: [newShift]});
            }


            return newShift;
        }
    }
}

module.exports = resolvers;