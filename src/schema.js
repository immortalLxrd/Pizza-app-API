const { gql } = require('apollo-server-express')

module.exports = gql`
    scalar DateTime

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
        toppings: []
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Mutation {
        newPizza(name: String!, size: String!, slices: Int!): Pizza!
        updatePizza(id: ID!, name: String!, size: String!, slices: Int!, toppings: [String]): Pizza!
        deletePizza(id: ID!): Boolean!
    }
`