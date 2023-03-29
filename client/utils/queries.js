import { gql } from '@apollo/client';

export const QUERY_SHIFTS = gql`
    query shifts {
        _id
        date
        timezone
        startTime
        endTime
    }
`