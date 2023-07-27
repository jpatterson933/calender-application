import { previousMonday, isMonday, addDays } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

// recursive function to build work week from Monday to Friday
function buildWorkWeek(startDate, datesArray = []) {
    if (datesArray.length === 5) {
        return datesArray;
    }

    datesArray.push(startDate);
    const nextDay = addDays(startDate, 1);
    const convertToDate = new Date(nextDay);

    return buildWorkWeek(convertToDate, datesArray);
};

function removeAutoLocalTime(dateObj){
    dateObj.setHours(0, 0, 0, 0)
    return dateObj;
    
}


export const createEmptyWeeksWithShifts = (shifts) => {

    const weeks = shifts.map(shift => {
        let shiftDateObj = new Date(shift.date);

        shiftDateObj = removeAutoLocalTime(shiftDateObj)

        // console.log(shiftDateObj, "shiftDateObj")
        const shiftOnMonday = isMonday(shiftDateObj);


        let thisIsMonday;
        if (!shiftOnMonday) {
            thisIsMonday = previousMonday(shiftDateObj);

        } else if (shiftOnMonday) {
            thisIsMonday = shiftDateObj;
        }
        return buildWorkWeek(thisIsMonday)
    });

    const uniqueWeeks = weeks.filter((week, index, self) => {
        return index === self.findIndex((w) => JSON.stringify(w) === JSON.stringify(week))
    })
    return uniqueWeeks;
};

// deprecated // unused for now as date formatting has completely changed
// might delete //
export const formatDate = (date) => {
    const year = date.split("-")[0]
    const month = date.split("-")[1]
    const day = date.split("-")[2]

    return `${month}/${day}/${year}`
};