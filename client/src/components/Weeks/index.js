import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKS } from "../../utils/queries";

import { utcToZonedTime, format } from "date-fns-tz";
import { removeAutoLocalTime } from "../../utils/helpers";
// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";

export const Week = () => {

    const { loading, data } = useQuery(QUERY_WEEKS);

    const weeks = useMemo(() => {
        return data?.weeks || [];
    }, [data]); // so if something in shifts changes, this will be recalculated
    // console.log(weeks, "weeks")

    function convertTimestampToPacific(timestamp) {
        let date = new Date(Number(timestamp));
        date.setHours(date.getHours() + 12); // ensures we are in pacific time // this fixes the issue with sunday being returned for monday
        let dateInPacificTime = utcToZonedTime(date, 'America/Los_Angeles')
        let noTimeOnDate = removeAutoLocalTime(dateInPacificTime)
        // Format the date as 'YYYY-MM-DD'.
        let formattedDate = format(noTimeOnDate, 'yyyy-MM-dd', { timeZone: 'America/Los_Angeles' });
        
        return formattedDate;
    }

    function renderTable() {
        return (
            weeks.map((week, index) => {
                const shiftsForWeek = week.dates.map(date => {
                    // console.log(week, "test")
                    const convertedDate = convertTimestampToPacific(date);
                    const shiftForDate = week.savedShifts.find(shift => {
                        if (shift.date === convertedDate) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    // console.log(shiftForDate, "shift for date ")
                    return shiftForDate
                        ? `Shift: ${shiftForDate.startTime} - ${shiftForDate.endTime}`
                        : null;
                })
                // console.log(shiftsForWeek, "shifts wor week?")
                return (
                    <Table striped bordered hover variant="dark" key={index}>
                        <thead>
                            <tr>
                                {week.dates.map((date, dateIndex) => (
                                    <th key={dateIndex}>{convertTimestampToPacific(date)}</th>

                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {shiftsForWeek.map((shift, shiftIndex) => (
                                    <td key={shiftIndex}>{shift}</td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                )
            })
        );
    }



    if (loading === false) {
        return (
            <>
                {renderTable()}
            </>
        );
    } else {
        return <div>Loading...</div>;
    }
};
