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

  type Query {
    shifts: [Shift]
  }
`;

module.exports = typeDefs;
