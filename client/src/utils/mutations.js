import { gql } from '@apollo/client';

export const ADD_SHIFT = gql`
    mutation addShift(
        $date: String!
        $timezone: String!
        $startTime: String!
        $endTime: String!
    ) {
        addShift(
            date: $date
            timezone: $timezone
            startTime: $startTime
            endTime: $endTime
        ) {
            _id
            date
            timezone
            startTime
            endTime
        }
    }
`