
const { Week, Shift } = require('../models');
import { previousMonday, isMonday, addDays } from "date-fns";

function getMondayDate(shiftDate){
    let isMondayBoolean = isMonday(shiftDate);

    if(isMondayBoolean){
        return shiftDate;
    } else {
        return previousMonday(shiftDate);
    }

}

const resolvers = {
    Query: {
        shifts: async () => {
            return await Shift.find({})
        }
    },
    Mutation: {
        addShift: async (parent, {date, timezone, startTime, endTime}) => {
            const newShift = await Shift.create({date, timezone, startTime, endTime});

            const mondayDate = getMondayDate(date);

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