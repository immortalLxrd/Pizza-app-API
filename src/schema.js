const { gql } = require('apollo-server-express')

module.exports = gql`
    scalar DateTime

    type Query {
        hello: String
        pizzaList: [Pizza!]!
        pizzaItem(id: ID!): Pizza!
        user(phoneNumber: String!): User
        users: [User!]!
        me: User!
    }

    type Pizza {
        id: ID!
        name: String!
        size: String!
        slices: Int!
        toppings: [String]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        phoneNumber: String!
        email: String!
        password: String!
        permissions: [String!]!
    }

    type Mutation {
        newPizza(name: String!, size: String!, slices: Int!): Pizza!
        updatePizza(id: ID!, name: String!, size: String!, slices: Int!, toppings: [String]): Pizza!
        deletePizza(id: ID!): Boolean!
        signUp(phoneNumber: String!, email: String, password: String!): String!
        signIn(phoneNumber: String!, password: String!): String!
    }
`