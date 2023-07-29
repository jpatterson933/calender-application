const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Time

  type Shift {
    _id: ID
    date: String
    timezone: String
    startTime: String
    endTime: String
  }

  type Week {
    _id: ID
    dates: [String]
    savedShifts: [Shift]
  }

  type Query {
    shifts: [Shift]
    weeks: [Week]
  }

  type Mutation {
    addShift(date: String!, timezone: String!, startTime: String!, endTime: String!): Shift
  }
`;

module.exports = typeDefs;
