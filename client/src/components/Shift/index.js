import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";
import { createWeek, formatDate } from "../../utils/helpers";
// import {createWeek} from "../../utils/createWeek";
// import {formatDate} from "../../utils/formatDate";

export const Shift = () => {
    const { loading, data } = useQuery(QUERY_SHIFTS);
    // this ensures we all use one instance of the shifts data. this prevents high memory usage and potential volatility
    const shifts = useMemo(() => {
        return data?.shifts || [];
    }, [data]) // if something in data changes, this will be recaluclated

    const weeks = useMemo(() => {
        return createWeek(shifts);
    }, [shifts]); // so if something in shifts changes, this will be recalculated

    function returnHour(time) {
        return parseInt(time.split(":")[0])
    }



    function showWeeks() {

        function renderShift(shift) {
            const startHour = returnHour(shift.startTime);
            const endHour = returnHour(shift.endTime);
            const pacificTimeSlots = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

            const timeSlotsJSX = pacificTimeSlots.map(time => {
                if (time >= startHour && time <= endHour) {
                    return <div data-time={time} key={time} style={{ color: "green", backgroundColor: "lightblue" }}>{time}</div>;
                } else
                    return <div key={time}>{time}</div>;
            });

            return (
            <section key={shift._id}>
                <div>{timeSlotsJSX}</div>
            </section>
            )
        }

        const renderWeek = (week) => {

            function matchDateWithDayOfWeek(day) {
                const matchingDays = shifts.filter(shift => shift.date === day.date).map(shift => renderShift(shift));
                return matchingDays;
            }

            const weekCardStyles = {
                border: "2px dashed black",
                margin: "0",
                padding: "5px"
            }

            const newWeekContainer = week.days.map((day) => (
                <div key={day.date} style={weekCardStyles}>
                    <h3>{day.day}</h3>
                    <h3>{formatDate(day.date)}</h3>
                    {matchDateWithDayOfWeek(day)}
                    {/* {shifts.filter(shift => shift.date === day.date).map(shift => renderShift(shift))} */}
                </div>
            ));

            return newWeekContainer;
        };

        const weeksJsx = weeks.map((week, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                {renderWeek(week)}
            </div>
        ));

        return weeksJsx;
    }

    if (loading === false) {
        return (
            <>{showWeeks()}</>
        );
    } else {
        return <div>Loading...</div>;
    }
};

