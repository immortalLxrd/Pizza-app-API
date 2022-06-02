const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const db = require('./db')

const { JWT_SECRET, PORT, DB_HOST } = process.env

const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const port = PORT || 4000


db.connect(DB_HOST)

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, JWT_SECRET)
        } catch (err) {
            new Error('Session invalid')
        }
    }
}

async function startApolloServer(typeDefs, resolvers, port) {
    const app = express()
    const server = new ApolloServer({
        typeDefs, resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || ''
            const user = getUser(token)
            return { models, user }
        }
    })
    await server.start()
    server.applyMiddleware({ app, path: '/api' })
    app.listen({ port }, () =>
        console.log(
            `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
        ))
}

startApolloServer(typeDefs, resolvers, port)