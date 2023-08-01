import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKS } from "../../utils/queries";

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";

export const Week = () => {

    const { loading, data } = useQuery(QUERY_WEEKS);

    const weeks = useMemo(() => {
        return data?.weeks || [];
    }, [data]); // so if something in shifts changes, this will be recalculated

    function renderTable() {
        const sortedWeeks = [...weeks].sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]));
        return (
            sortedWeeks.map((week, index) => {
                const shiftsForWeek = week.dates.map(date => {
                    // console.log(week, "test")
                    // const convertedDate = convertTimestampToPacific(date);
                    const shiftsForDate = week.savedShifts.filter(shift => shift.date === date)
                    // console.log(shiftForDate, 'tes')

                    return shiftsForDate.map((shift, shiftIndex) => `Shift ${shiftIndex + 1}: ${shift.startTime} - ${shift.endTime}`).join(", ")

                })
                // console.log(shiftsForWeek, "shifts wor week?")
                return (
                    <Table striped bordered hover variant="dark" key={index}>
                        <thead>
                            <tr>
                                {week.dates.map((date, dateIndex) => (
                                    <th key={dateIndex}>{date}</th>

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
