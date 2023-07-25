export const createWeek = (shifts) => {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // // time slots from 5am to 9pm pacific time
    // const pacificTimeSlots = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    // initiate empty weeks array
    const weeks = [];

    shifts.forEach((shift) => {
        const currentDate = new Date(shift.date);
        const currentDay = currentDate.getDay();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - (currentDay - 1)));

        const weekStart = startOfWeek.toISOString().split("T")[0];
        // console.log("Date information", weekStart)
        // here we get the dates that start for the week, and it will set up a new week object with an empty array for five days
        if (!weeks.find((week) => week.start === weekStart)) {
            const week = {
                start: weekStart,
                days: []
            };
            // when a new week is created it will plug in five days with date formate 2023-mm-dd
            for (let i = 1; i <= 5; i++) {
                const dayDate = new Date(startOfWeek);
                dayDate.setDate(dayDate.getDate() + (i - 1));
                console.log(dayDate.toISOString().split("T")[0], "test")
                week.days.push({ day: weekDays[i], date: dayDate.toISOString().split("T")[0] });
            }

            weeks.push(week);
        }
    });
    // console.log(weeks)
    return weeks;
};