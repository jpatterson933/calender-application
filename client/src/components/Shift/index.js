import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";
import {createWeek} from '../../utils/createWeek';

export const Shift = () => {
    const { loading, data } = useQuery(QUERY_SHIFTS);
    // this ensures we all use one instance of the shifts data. this prevents high memory usage and potential volatility
    const shifts = useMemo(() => {
        return data?.shifts || [];
    }, [data])

    const weeks = useMemo(() => {
        return createWeek(shifts);
    }, [shifts]);


    const renderShift = (shift) => {
        // time slots from 5am to 9pm pacific time
        const pacificTimeSlots = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

        // Split the startTime and endTime strings on the ":" character to get the hour value
        const startHour = parseInt(shift.startTime.split(":")[0]);
        const endHour = parseInt(shift.endTime.split(":")[0]);
        
        const startMeridian = shift.startTime.split(":")[1].split(" ")[1]
        const endMeridian = shift.endTime.split(":")[1].split(" ")[1]

        const test = () => {
            const test = pacificTimeSlots.slice(startIndex, endIndex + 1).map(slot => {
                console.log(slot)
            })

            return test;
        }

        console.log(test)




        // Find the index of the corresponding time slots in the pacificTimeSlots array
        const startIndex = pacificTimeSlots.indexOf(startHour);
        const endIndex = pacificTimeSlots.indexOf(endHour);

        // Render the shift with the matching time slots on the right side
        return (
            <section key={shift._id}>
                <div>
                    {pacificTimeSlots.map(time => {

                        if (time === startHour) {
                            return <div style={{ color: "green" }}>{time}</div>
                        } else
                            return <div>{time}</div>
                    })}
                </div>
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

