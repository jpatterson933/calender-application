import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKS } from "../../utils/queries";

import { utcToZonedTime, format } from "date-fns-tz";
import { createEmptyWeeksWithShifts, removeAutoLocalTime } from "../../utils/helpers";
// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";

export const Week = () => {

    const { loading, data } = useQuery(QUERY_WEEKS);

    const weeks = useMemo(() => {
        console.log(data)
        return data?.weeks || [];
    }, [data]); // so if something in shifts changes, this will be recalculated


    function getDateString(date) {
        const convertedDateString = new Date(Number(date));
        return convertedDateString;
    }

    function convertTimestampToPacific(timestamp) {
        let date = new Date(Number(timestamp));
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
                    console.log(date, "pre converted date")
                    const convertedDate = convertTimestampToPacific(date);
                    console.log(convertedDate, "converted")
                    // const pacificDateTimeStamp = convertTimestampToPacific(shift.date);
                    const shiftForDate = week.savedShifts.find(shift => {
                        console.log(shift.date, "shiftdate inside other function")
                        // let convertedTimestamp = convertTimestampToPacific(shift.date);
                        // console.log(convertedTimestamp, "convert")
                        // let stringTimeStamp = String(convertedTimestamp);
                        // let stringDate = String(convertedDate)
                        if (shift.date === convertedDate) {

                            return shift;
                        }
                    });
                    // console.log(date, "date")
                    // console.log(getDateString(date), date, "date string????")
                    return shiftForDate
                        ? `${convertedDate} - ${shiftForDate.startTime} - ${shiftForDate.endTime}`
                        : null;


                })
                console.log(shiftsForWeek, "shiftworkweek")
                return (
                    <Table striped bordered hover variant="dark" key={index}>
                        <thead>
                            <tr>
                                {week.dates.map((date, dateIndex) => (
                                    <th key={dateIndex}>{new Date(Number(date)).toLocaleDateString()}</th>

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
