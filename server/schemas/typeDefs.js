// import the gql template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Query {
        helloZach: String
    }
`;

// export the typeDefs
module.exports = typeDefs;