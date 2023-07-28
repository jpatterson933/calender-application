import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";
import { createEmptyWeeksWithShifts, removeAutoLocalTime } from "../../utils/helpers";
// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";

export const Shift = () => {
    const { loading, data } = useQuery(QUERY_SHIFTS);
    // set up state for shifts
    // this ensures we all use one instance of the shifts data. this prevents high memory usage and potential volatility
    const shifts = useMemo(() => {
        return data?.shifts || [];
    }, [data]) // if something in data changes, this will be recaluclated

    const weeks = useMemo(() => {
        return createEmptyWeeksWithShifts(shifts);
    }, [shifts]); // so if something in shifts changes, this will be recalculated

    function renderTableHeaderDates() {
        return (
            <thead>
                {weeks.map((week, index) => {

                    return (
                        <tr key={index}>
                            {week.map((day, index) => {
                                let stringDate = day.toString();
                                return (
                                    <th key={index}>{stringDate}</th>
                                )
                            })}
                        </tr>
                    )
                }
                )}

            </thead>
        )
    }

    // {weeks.map((week, index) => {
    //     console.log(week)
    //     return (
    //         <tr key={index}>
    //                 {shifts.map((shift, shiftIndex) => {
    //                     const dateString = removeAutoLocalTime(shift.date);
    //                     console.log(dateString, "date stirng ------------------")
                        
    //                     const matchingDay = week.filter((day) => day === dateString);
    //                     console.log(matchingDay, "test")
    //                     if(matchingDay){
    //                         console.log("please work");
    //                         return <td key={shiftIndex}>{matchingDay}</td>
    //                     } else {
    //                         console.log("did not work");
    //                         return <td key={shiftIndex}>{matchingDay}</td>
    //                     }
    //                 })}
    //         </tr>

    //     )
    // })}
    function renderTableBody() {
        return (
            <tbody>
                {shifts.map((shift, index) => {
                    const dateString = removeAutoLocalTime(shift.date);
                    let test2 = weeks.flatMap((week, index) => {
                        return week.filter(day => day === dateString);
                    })
                    console.log(test2, "hmmm")
                })}
            </tbody>
        )
    }

    if (loading === false) {
        return (
            <Table striped bordered hover variant="dark">
                {renderTableHeaderDates()}
                {renderTableBody()}
            </Table>
        );
    } else {
        return <div>Loading...</div>;
    }
};

