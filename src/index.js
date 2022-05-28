const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
require('dotenv').config()

const db = require('./db')
const models = require('./models')

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST


const typeDefs = gql`
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
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL API!',
        pizzaList: async () => {
            return await models.Pizza.find()
        },
        pizzaItem: async (parent, args) => {
            return await models.Pizza.findById(args.id)
        }
    },
    Mutation: {
        newPizza: async (parent, args) => {
            let pizzaValue = {
                id: String(pizzaList.length + 1),
                name: args.name,
                size: args.size,
                slices: args.slices,
                toppings: []
            }
            return await models.Pizza.create(pizzaValue)
        }
    }
}


db.connect(DB_HOST)

async function startApolloServer(typeDefs, resolvers, port) {
    const app = express()
    const server = new ApolloServer({
        typeDefs, resolvers,
        csrfPrevention: true,
    })
    await server.start()
    server.applyMiddleware({ app, path: '/api' })
    app.listen({ port }, () =>
        console.log(
            `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
        ))
}

startApolloServer(typeDefs, resolvers, port)