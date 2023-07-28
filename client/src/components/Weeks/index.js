import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKS } from "../../utils/queries";
// import { createEmptyWeeksWithShifts, removeAutoLocalTime } from "../../utils/helpers";
// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";

export const Shift = () => {
    const { loading, data } = useQuery(QUERY_WEEKS);
    // set up state for shifts
    // this ensures we all use one instance of the shifts data. this prevents high memory usage and potential volatility
    const shifts = useMemo(() => {
        return data?.shifts || [];
    }, [data]) // if something in data changes, this will be recaluclated

    const weeks = useMemo(() => {
        return data?.weeks || [];
    }, [shifts]); // so if something in shifts changes, this will be recalculated

    console.log(shifts, "inside weeks")


    if (loading === false) {
        return (
            <Table striped bordered hover variant="dark">
            </Table>
        );
    } else {
        return <div>Loading...</div>;
    }
};
