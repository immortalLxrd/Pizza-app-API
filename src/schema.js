const { gql } = require('apollo-server-express')

module.exports = gql`
    type Query {
        hello: String
        pizzaList: [Pizza!]!
        pizzaItem(id: ID!): Pizza!
    }

    type Pizza {
        id: ID!
        name: String!
        size: String!
        slices: Int!
        toppings: [String]
    }

    type Mutation {
        newPizza(name: String!, size: String!, slices: Int!): Pizza!
        updatePizza(id: ID!, name: String!, size: String!, slices: Int!): Pizza!
        deletePizza(id: ID!): Boolean!
    }
`