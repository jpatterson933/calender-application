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

    function renderTable() {
        return (
            <Table>
                {weeks.map((week, index) => (
                    <>
                        <thead>

                            <tr key={index}>
                                {week.dates.map((day, dayIndex) => {
                                    console.log(day, "day")
                                    let readableDate = getDateString(day);
                                    let stringDate = String(readableDate)
                                    console.log(stringDate, 'readable date')
                                    return (
                                        <td key={dayIndex}>
                                            {stringDate}
                                        </td>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {week.savedShifts.map((shift, shiftIndex) => {
                                // console.log(shift, "shift?")

                                return (
                                    <tr>
                                        <td>{shift._id}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                ))}


            </Table>
        )
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
