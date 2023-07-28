import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKS } from "../../utils/queries";
// import { createEmptyWeeksWithShifts, removeAutoLocalTime } from "../../utils/helpers";
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

    // {weeks.map((week, index) => (
    //     <>
    //         <thead>

    //             <tr key={index}>
    //                 {week.dates.map((day, dayIndex) => {
    //                     let readableDate = getDateString(day);
    //                     let stringDate = String(readableDate)
    //                     console.log(stringDate, 'readable date')
    //                     return (
    //                         <td key={dayIndex}>
    //                             {stringDate}
    //                         </td>
    //                     )
    //                 })}
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {week.savedShifts.map((shift, shiftIndex) => {
    //                 // console.log(shift, "shift?")
    //                 let readableDate = getDateString(shift.date);
    //                 let stringDate = String(readableDate).split(" 17")[0]
    //                 return (
    //                     <tr>
    //                         <td>{stringDate} {shift.startTime} {shift.endTime}</td>
    //                     </tr>
    //                 )
    //             })}
    //         </tbody>
    //     </>
    // ))}

    function renderTable() {
        return (
            weeks.map((week, index) => {
                const shiftsForWeek = week.dates.map(date => {
                    const shiftForDate = week.savedShifts.find(shift => shift.date === date);
                    return shiftForDate
                    ? `${new Date(Number(date)).toLocaleDateString()} - ${shiftForDate.startTime} - ${shiftForDate.endTime}`
                    : null;
                })

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
