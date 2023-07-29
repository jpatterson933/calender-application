import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SHIFTS } from "../../utils/queries";
// import { createEmptyWeeksWithShifts, removeAutoLocalTime } from "../../utils/helpers";
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
        // return createEmptyWeeksWithShifts(shifts);
    }, [shifts]); // so if something in shifts changes, this will be recalculated



    if (loading === false) {
        return (
            <Table striped bordered hover variant="dark">
            </Table>
        );
    } else {
        return <div>Loading...</div>;
    }
};

