import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";
import { createEmptyWeeksWithShifts } from "../../utils/helpers";
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
    console.log(shifts, "shifts")
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

    function renderTableBody() {
        return (
            <tbody>
                {weeks.map((week, index) => {
                    console.log(week)
                    return (
                        <tr>
                            {week.map((day, index) => {
                                shifts.filter(shift => (new Date(shift.date)) === day).map(s => <td>s{s}</td>)
                            })}
                        </tr>

                    )
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

