import { gql } from '@apollo/client';

export const QUERY_SHIFTS = gql`
    query {
        shifts {
            _id
            date
            timezone
            startTime
            endTime
        }
}
`

export const QUERY_WEEKS = gql`
    query{
        weeks {
            _id
            dates
            savedShifts {
                _id
                date
                timezone
                startTime
                endTime
              }
        }
    }
`