import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";

const getWeeks = (shifts) => {
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
                week.days.push({ day: weekDays[i], date: dayDate.toISOString().split("T")[0] });
            }

            weeks.push(week);
        }
    });
    // console.log(weeks)
    return weeks;
};

export const Shift = () => {
    const { loading, data } = useQuery(QUERY_SHIFTS);
    // this ensures we all use one instance of the shifts data. this prevents high memory usage and potential volatility
    const shifts = useMemo(() => {
        return data?.shifts || [];
    }, [data])

    const weeks = useMemo(() => {
        return getWeeks(shifts);
    }, [shifts]);

    const renderTimeSlot = (timeSlot, isMatch) => (
        <div
            key={timeSlot}
            style={{
                border: isMatch ? "1px solid black" : "none",
                padding: "1rem",
                margin: "1rem"
            }}
        >
            {timeSlot}:00
        </div>
    );

    const renderShift = (shift) => {
        // time slots from 5am to 9pm pacific time
        const pacificTimeSlots = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        // Split the startTime and endTime strings on the ":" character to get the hour value
        const startHour = parseInt(shift.startTime.split(":")[0]);
        const endHour = parseInt(shift.endTime.split(":")[0]);

        // Find the index of the corresponding time slots in the pacificTimeSlots array
        const startIndex = pacificTimeSlots.indexOf(startHour);
        const endIndex = pacificTimeSlots.indexOf(endHour);

        // Render the shift with the matching time slots on the right side
        return (
            <section key={shift._id}>
                <ul>
                    {/* <li>{shift.date}</li> */}
                    <li>{shift.timezone}</li>
                    <li>{shift.startTime + " " + shift.startMeridian}</li>
                    <li>{shift.endTime + " " + shift.endMeridian}</li>
                </ul>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* Render the time slots on the right side */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {pacificTimeSlots.slice(startIndex, endIndex + 1).map(slot => (
                            <div key={slot} style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}>
                                {slot}:00
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    // console.log(renderShift)

    const renderWeek = (week) => {
        // console.log(week.days, "week.days")

        const weekCardStyles = {
            border: "1px dashed black",
            padding: "0 1em",
            margin: "0",
            borderRadius: "24px"
        }
        return week.days.map((day) => (
            <div key={day.date} style={weekCardStyles}>
                <h3>
                    {day.day} - {day.date}
                </h3>
                {/* {console.log(shifts)} */}
                {shifts.filter(shift => shift.date === day.date).map(shift => renderShift(shift))}
            </div>
        ));
    };

    if (loading === false) {
        return (
            <>
                {weeks.map((week, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                        {renderWeek(week)}
                    </div>
                ))}
            </>
        );
    } else {
        return <div>Loading...</div>;
    }
};

