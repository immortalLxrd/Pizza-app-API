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
        pizzaFeed(cursor: String): PizzaFeed
    }

    type Pizza {
        id: ID!
        name: String!
        img: String!
        size: String!
        price: String!
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

    type PizzaFeed {
        items: [Pizza]!
        cursor: String!
        hasNextPage: Boolean!
    }

    type Mutation {
        newPizza(name: String!, img: String!, size: String!, price: String!): Pizza!
        updatePizza(id: ID!, name: String!, img: String!, size: String!, price: String!): Pizza!
        deletePizza(id: ID!): Boolean!
        signUp(phoneNumber: String!, email: String, password: String!): String!
        signIn(phoneNumber: String!, password: String!): String!
    }
`